function parse(filename){
    var reader = new FileReader();
    var contents = FileReader.readAsText(filename, 'UTF-8');
    console.log(contents);
}
