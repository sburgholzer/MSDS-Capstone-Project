* open the file
'open /media/sf_D_DRIVE/MSDS-Capstone-Project/notebooks/merged_AWIP32.19790130/test.ctl'
* set up text file headers
dummy=write('/media/sf_D_DRIVE/MSDS-Capstone-Project/notebooks/merged_AWIP32.19790130/test.txt', 'VAR,VAL')

* 2M Temp
't = aave(tmp2m, lon=-108.265141, lon=-88.213196, lat=25.60345, lat=49.332204)'
'd t'
tmp=subwrd(result,4)
write('/media/sf_D_DRIVE/MSDS-Capstone-Project/notebooks/merged_AWIP32.19790130/test.txt','2mTemp,' tmp,append)

* 2M Dewpoint
't = aave(dpt2m, lon=-108.265141, lon=-88.213196, lat=25.60345, lat=49.332204)'

* CAPE SFC
't = aave(capesfc, lon=-108.265141, lon=-88.213196, lat=25.60345, lat=49.332204)'

* CIN SFC
't = aave(cinsfc, lon=-108.265141, lon=-88.213196, lat=25.60345, lat=49.332204)'

* Potential Temp SFC
't = aave(potsfc, lon=-108.265141, lon=-88.213196, lat=25.60345, lat=49.332204)'

* SFC Pressure
't = aave(pressfc, lon=-108.265141, lon=-88.213196, lat=25.60345, lat=49.332204)'

* PWAT
't = aave(PWATclm, lon=-108.265141, lon=-88.213196, lat=25.60345, lat=49.332204)'

* RH 2M
't = aave(rh2m, lon=-108.265141, lon=-88.213196, lat=25.60345, lat=49.332204)'

* Storm Relative Helicity
't = aave(hlcy0_3000m, lon=-108.265141, lon=-88.213196, lat=25.60345, lat=49.332204)'

* 250
'set lev 250'
* Geopotenial height
't = aave(hgtprs, lon=-108.265141, lon=-88.213196, lat=25.60345, lat=49.332204)'

* Temp
't = aave(tmpprs, lon=-108.265141, lon=-88.213196, lat=25.60345, lat=49.332204)'

* wind spd
'aave(mag(ugrdprs,vgrdprs), lon=-108.265141, lon=-88.213196, lat=25.60345, lat=49.332204)'

* U Wind
*'t = aave(ugrdprs, lon=-108.265141, lon=-88.213196, lat=25.60345, lat=49.332204)'

* V Wind
*'t = aave(vgrdprs, lon=-108.265141, lon=-88.213196, lat=25.60345, lat=49.332204)'
