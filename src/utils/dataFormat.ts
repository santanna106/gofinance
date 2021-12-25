export function formataData (data:string){
    let dia = data.split("/")[0];
    let mes = data.split("/")[1];
    let ano = data.split("/")[2];

    let formatDate = '20'+ano + '-' + ("0" + mes).slice(-2) + '-' + ("0" + dia).slice(-2);
    
    return formatDate;

}