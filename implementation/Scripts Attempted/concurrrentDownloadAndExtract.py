import os, sys, requests, tarfile, re, time, shutil
from multiprocessing.pool import ThreadPool

year = sys.argv[1]
dataDir = "/mnt/data3/scott/" + year + "data"
textDir = "/mnt/data3/scott/textfiles"
scriptDir = "/mnt/data3/scott/scripts"

with open('/home/sburgholzer/.rdaPass.txt', 'r') as file:
    pswd = file.read().replace('\n', '')

url = 'https://rda.ucar.edu/cgi-bin/login'
values = {'email' : 'scottaburgholzer@lewisu.edu', 'passwd' : pswd, 'action' : 'login'}
# Authenticate
ret = requests.post(url,data=values)
if ret.status_code != 200:
    print('Bad Authentication')
    print(ret.text)
    exit(1)
    

def download_url(url):
    print("Downloading: ", url)
    os.chdir(dataDir)
    file_name_start_pos = url.rfind("/") + 1
    file_name = url[file_name_start_pos:]
    
    req = requests.get(url, cookies = ret.cookies, allow_redirects=True, stream=True)
    with open(dataDir + "/" + file_name, 'wb') as outfile:
        chunk_size = 1048576
        for chunk in req.iter_content(chunk_size=chunk_size):
            outfile.write(chunk)
    
    return url

def tarExtract(dataDir):
    os.chdir(dataDir)
    print('\nExtracting TAR files....')
    tarFiles = [f for f in os.listdir(dataDir)]
    for tarFile in tarFiles:
      tf = tarfile.open(dataDir + "/" + tarFile)
      tf.extractall()
      tf.close()

def deleteUnneededFiles(dataDir):
    os.chdir(dataDir)
    print("\nDeleting all non 12 and 00Z files")
    gribFiles = [f for f in os.listdir(dataDir)]
    for gribFile in gribFiles:
      if re.match(r'merged_AWIP32\.[0-9]{4}[0-9]{2}[0-9]{2}[0-9]{2}\.b', gribFile):
        os.remove(dataDir + "/" + gribFile)
      elif not re.match(r'merged_AWIP32\.[0-9]{4}[0-9]{2}[0-9]{2}(12|00)', gribFile):
        os.remove(dataDir + "/" + gribFile)

def extractFromGrib(dataDir, scriptDir):
    os.chdir(dataDir)
    print('\nExtracting from Grib')
    gribFiles = [f for f in os.listdir(dataDir)]
    for gribFile in gribFiles:
      # Create the CTL file
      os.system('perl ' + scriptDir + '/grib2ctl.pl -verf ' + dataDir + '/' + gribFile + '>' + gribFile + '.ctl')
      # Create the IDX file
      os.system('gribmap -q -v -i ' + gribFile + '.ctl')
      # run the GrADS script
      os.system('grads -bxcl "run ' + scriptDir + '/arealAverages.gs ' + gribFile + '.ctl ' + year + '"')

with open('/mnt/data3/scott/scripts/' + year + 'url.txt', 'r') as file:
    dspath = file.read().replace('\n', '')

with open('/mnt/data3/scott/scripts/' + year + 'files.txt', 'r') as file:
  tempfiles = file.read().replace('\n','')

filelist = tempfiles.split(",")
filelist = [dspath + s for s in filelist]

# make the new textfile directory
if not os.path.isdir(textDir + "/" + year):
  os.mkdir(textDir + "/" + year)

# make the new data directory
if not os.path.isdir(dataDir):
  os.mkdir(dataDir)

results = ThreadPool(5).imap_unordered(download_url, filelist)
for r in results:
    print(r)

print("now to get the data from the files....")
tarExtract(dataDir)
deleteUnneededFiles(dataDir)
extractFromGrib(dataDir, scriptDir)

# remove the data folder
shutil.rmtree(dataDir)

os.remove(scriptDir + "/" + year + "files.txt")
os.remove(scriptDir + "/" + year + "url.txt")