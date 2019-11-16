* get the passed in filename
function createTxtFile(args)
 filename=subwrd(args,1)

* open the file
'open /media/sf_D_DRIVE/MSDS-Capstone-Project/notebooks/' filename

* set time to the 12Z hour
'set t 1'

* query the time so we can appropriatley name the text file
'q time'
datestr=subwrd(result,3)
vyear = substr(datestr,9,4)
vmonth = substr(datestr,6,3)
vday = substr(datestr,4,2)
vhour = substr(datestr,1,2)
newdatestr = vmonth '-' vday '-' vyear '-' vhour 'Z'

* textfile name
textfile='/media/sf_D_DRIVE/MSDS-Capstone-Project/notebooks/textfiles/' newdatestr '.txt'

* set up the text file headers
dummy=write(textfile, 'VAR,VAL,UNITS')

* GET THE DATA

* 2M Temp
't = aave(tmp2m, lon=-108.265141, lon=-88.213196, lat=25.60345, lat=49.332204)'
'd t'
tmp=subwrd(result,4)
dummy=write(textfile,'2mTemp,' tmp ',Kelvin',append)

* 2M Dewpoint
't = aave(dpt2m, lon=-108.265141, lon=-88.213196, lat=25.60345, lat=49.332204)'
'd t'
tmp=subwrd(result,4)
dummy=write(textfile,'2mDpt,' tmp ',Kelvin',append)

* CAPE SFC
't = aave(capesfc, lon=-108.265141, lon=-88.213196, lat=25.60345, lat=49.332204)'
'd t'
tmp=subwrd(result,4)
dummy=write(textfile,'sfcCAPE,' tmp ',J/kg',append)

* CIN SFC
't = aave(cinsfc, lon=-108.265141, lon=-88.213196, lat=25.60345, lat=49.332204)'
'd t'
tmp=subwrd(result,4)
dummy=write(textfile,'sfcCIN,' tmp ',J/kg',append)

* Potential Temp SFC
't = aave(potsfc, lon=-108.265141, lon=-88.213196, lat=25.60345, lat=49.332204)'
'd t'
tmp=subwrd(result,4)
dummy=write(textfile,'sfcPotentialTmp,' tmp ',Kelvin',append)

* SFC Pressure
't = aave(pressfc, lon=-108.265141, lon=-88.213196, lat=25.60345, lat=49.332204)'
'd t'
tmp=subwrd(result,4)
dummy=write(textfile,'sfcPressure,' tmp ',Pa',append)

* PWAT
't = aave(PWATclm, lon=-108.265141, lon=-88.213196, lat=25.60345, lat=49.332204)'
'd t'
tmp=subwrd(result,4)
dummy=write(textfile,'PWAT,' tmp ',kg/m^2',append)

* RH 2M
't = aave(rh2m, lon=-108.265141, lon=-88.213196, lat=25.60345, lat=49.332204)'
'd t'
tmp=subwrd(result,4)
dummy=write(textfile,'2mRH,' tmp ',%',append)

* Storm Relative Helicity
't = aave(hlcy0_3000m, lon=-108.265141, lon=-88.213196, lat=25.60345, lat=49.332204)'
'd t'
tmp=subwrd(result,4)
dummy=write(textfile,'srh,' tmp ',m^2/s^2',append)

* Lifted Index
't = aave(lftx500_1000mb, lon=-108.265141, lon=-88.213196, lat=25.60345, lat=49.332204)'
'd t'
tmp=subwrd(result,4)
dummy=write(textfile,'lifted index (500-100mb),' tmp ',Kelvin',append)

* lifted index 2
't = aave(no4LFTX180_0mb, lon=-108.265141, lon=-88.213196, lat=25.60345, lat=49.332204)'
'd t'
tmp=subwrd(result,4)
dummy=write(textfile,'lifted index 180-0 mb above gnd Best (4-layer),' tmp ',Kelvin',append)

* 10 m wind
't = aave(mag(ugrd10m, vgrd10m), lon=-108.265141, lon=-88.213196, lat=25.60345, lat=49.332204)'
'd t'
tmp=subwrd(result,4)
dummy=write(textfile,'10m wind speed,' tmp ',m/s',append)


* 250 MB
'set lev 250'

* Geopotenial height
't = aave(hgtprs, lon=-108.265141, lon=-88.213196, lat=25.60345, lat=49.332204)'
'd t'
tmp=subwrd(result,4)
dummy=write(textfile,'250mb Geopotenial height,' tmp ',gpm',append)

* Temperature
't = aave(tmpprs, lon=-108.265141, lon=-88.213196, lat=25.60345, lat=49.332204)'
'd t'
tmp=subwrd(result,4)
dummy=write(textfile,'250mb Temperature,' tmp ',Kelvin',append)

* wind
't = aave(mag(ugrdprs, vgrdprs), lon=-108.265141, lon=-88.213196, lat=25.60345, lat=49.332204)'
'd t'
tmp=subwrd(result,4)
dummy=write(textfile,'250mb wind speed,' tmp ',m/s',append)

* 500 MB
'set lev 500'

* Geopotenial height
't = aave(hgtprs, lon=-108.265141, lon=-88.213196, lat=25.60345, lat=49.332204)'
'd t'
tmp=subwrd(result,4)
dummy=write(textfile,'500mb Geopotenial height,' tmp ',gpm',append)

* Temperature
't = aave(tmpprs, lon=-108.265141, lon=-88.213196, lat=25.60345, lat=49.332204)'
'd t'
tmp=subwrd(result,4)
dummy=write(textfile,'500mb Temperature,' tmp ',Kelvin',append)

* wind
't = aave(mag(ugrdprs, vgrdprs), lon=-108.265141, lon=-88.213196, lat=25.60345, lat=49.332204)'
'd t'
tmp=subwrd(result,4)
dummy=write(textfile,'500mb wind speed,' tmp ',m/s',append)



* 700 MB
'set lev 700'

* Geopotenial height
't = aave(hgtprs, lon=-108.265141, lon=-88.213196, lat=25.60345, lat=49.332204)'
'd t'
tmp=subwrd(result,4)
dummy=write(textfile,'700mb Geopotenial height,' tmp ',gpm',append)

* Temperature
't = aave(tmpprs, lon=-108.265141, lon=-88.213196, lat=25.60345, lat=49.332204)'
'd t'
tmp=subwrd(result,4)
dummy=write(textfile,'700mb Temperature,' tmp ',Kelvin',append)

* wind
't = aave(mag(ugrdprs, vgrdprs), lon=-108.265141, lon=-88.213196, lat=25.60345, lat=49.332204)'
'd t'
tmp=subwrd(result,4)
dummy=write(textfile,'700mb wind speed,' tmp ',m/s',append)


* 850 MB
'set lev 850'

* Geopotenial height
't = aave(hgtprs, lon=-108.265141, lon=-88.213196, lat=25.60345, lat=49.332204)'
'd t'
tmp=subwrd(result,4)
dummy=write(textfile,'850mb Geopotenial height,' tmp ',gpm',append)

* Temperature
't = aave(tmpprs, lon=-108.265141, lon=-88.213196, lat=25.60345, lat=49.332204)'
'd t'
tmp=subwrd(result,4)
dummy=write(textfile,'850mb Temperature,' tmp ',Kelvin',append)

* wind
't = aave(mag(ugrdprs, vgrdprs), lon=-108.265141, lon=-88.213196, lat=25.60345, lat=49.332204)'
'd t'
tmp=subwrd(result,4)
dummy=write(textfile,'850mb wind speed,' tmp ',m/s',append)


* 925 MB
'set lev 925'

* Geopotenial height
't = aave(hgtprs, lon=-108.265141, lon=-88.213196, lat=25.60345, lat=49.332204)'
'd t'
tmp=subwrd(result,4)
dummy=write(textfile,'925mb Geopotenial height,' tmp ',gpm',append)

* Temperature
't = aave(tmpprs, lon=-108.265141, lon=-88.213196, lat=25.60345, lat=49.332204)'
'd t'
tmp=subwrd(result,4)
dummy=write(textfile,'925mb Temperature,' tmp ',Kelvin',append)

* wind
't = aave(mag(ugrdprs, vgrdprs), lon=-108.265141, lon=-88.213196, lat=25.60345, lat=49.332204)'
'd t'
tmp=subwrd(result,4)
dummy=write(textfile,'925mb wind speed,' tmp ',m/s',append)
