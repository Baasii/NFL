// window.onload fires when the document's window (HTML page) is ready for presentation
window.onload = loadPlaces();

document.getElementById('places-dropdown').addEventListener('click', getSelectValue);

function loadPlaces(){
  let dropdown = document.getElementById('places-dropdown');
  // next four statements add the first row object to dropdown
  let defaultOption = document.createElement('option');
  defaultOption.text = 'Choose Location';
  defaultOption.value = '';
  dropdown.add(defaultOption);
  // chooses the first row of the dropdown object
  dropdown.selectedIndex = 0;

  // Ajax pyynnön lähettäminen JavaScriptistä ja 
  // vastaanotto, kun pyytö on loppuun asti suoritettu, onload-tapahtumassa
  const xhrObject = new XMLHttpRequest();
  let url = 'postinumerot.json';
  xhrObject.open('GET', url, true);
 
  xhrObject.onload = function() {
  if (xhrObject.status === 200) {
    const JSONdataObject = JSON.parse(xhrObject.responseText);
    let option;
    for (let i = 0; i < JSONdataObject.length; i++) {
      // next four statements add one row object to dropdown
      option = document.createElement('option');
      option.text = JSONdataObject[i].postitoimipaikka;
      option.value = JSONdataObject[i].postino;
      dropdown.add(option);
    }
  } 
}

xhrObject.onerror = function() {
  console.error('An error occurred fetching the JSON from ' + url);
};
xhrObject.send();
}
function getSelectValue()
{ 
    var selectedValue = document.getElementById("places-dropdown").value;
    document.getElementById("postino").value = selectedValue;
    
}
