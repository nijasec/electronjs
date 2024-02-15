
document.getElementById('savesettingsbtn').addEventListener('click',()=>{

    console.log('savessettings btn cvlicekd');

    var defaultsettings=    {
        diver1url:document.getElementById('diver1url').value,
        diver2url:document.getElementById('diver2url').value,
        diver3url:document.getElementById('diver3url').value,
        diver4url:document.getElementById('diver4url').value

    };
    storeSettings(defaultsettings);

})
async function storeSettings(a)
{
 await window.setStoreValue.setStoreValue(a);
 
}
window.onload=getSettings();
async function getSettings()
{
    const settings=await window.getStoreValue.getStoreValue('appsettings');
   document.getElementById('diver1url').value=settings.diver1url;
   document.getElementById('diver2url').value=settings.diver2url;
   document.getElementById('diver3url').value=settings.diver3url;
   document.getElementById('diver4url').value=settings.diver4url;

}