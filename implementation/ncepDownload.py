import requests, os, sys, shutil
from multiprocessing.pool import ThreadPool

year = sys.argv[1]
dataDir = "/mnt/data3/scott/" + year + "data"
textDir = "/mnt/data3/scott/textfiles"
scriptDir = "/mnt/data3/scott/scripts"

def check_file_status(filepath, filesize):
    sys.stdout.write('\r')
    sys.stdout.flush()
    size = int(os.stat(filepath).st_size)
    percent_complete = (size/filesize)*100
    sys.stdout.write('%.3f %s' % (percent_complete, '% Completed'))
    sys.stdout.flush()

def download_url(url):
    os.chdir(dataDir)
    print("\ndownloading: ", url)
    file_name_start_pos = url.rfind("/") + 1
    file_name = url[file_name_start_pos:]
    
    r = requests.get(url, allow_redirects=True, stream=True)
    filesize = int(r.headers['Content-length'])
    if r.status_code == requests.codes.ok:
        with open(file_name, 'wb') as f:
            chunk_size=1048576
            for chunk in r.iter_content(chunk_size=chunk_size):
              f.write(chunk)
              if chunk_size < filesize:
                check_file_status(file_name, filesize)
        check_file_status(file_name, filesize)
            #for data in r:
            #    f.write(data)
    return url

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

# make the new textfile directory
if not os.path.isdir(textDir + "/" + year):
  os.mkdir(textDir + "/" + year)

# make the new data directory
if not os.path.isdir(dataDir):
  os.mkdir(dataDir)

with open('/mnt/data3/scott/scripts/' + year + 'files.txt', 'r') as file:
  tempfiles = file.read().replace('\n','').replace('\t', '')

filelist = tempfiles.split(",")
while("" in filelist) : 
    filelist.remove("") 

#print(filelist)

for myfile in filelist:
    download_url(myfile)

#results = ThreadPool(5).imap_unordered(download_url, filelist)
#for r in results:
#    print("\n" + r + "\n")
    
extractFromGrib(dataDir, scriptDir)

# remove the data folder
#shutil.rmtree(dataDir)

os.remove(scriptDir + "/" + year + "files.txt")
