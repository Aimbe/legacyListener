function getCharerInfo(telNumber: string){
    let qry = '';
    qry = 'SELECT * FROM CARDEVMAN WHERE' + 
            'TERTELNUM = ' + telNumber;
    return qry;
}