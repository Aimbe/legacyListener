
export class CommonBase2 {
  protected id: string | undefined;                       //[header]INS
  protected length: number | undefined;                   //[header]ML
  protected receiveTime: string | undefined;              //[data]수집일시
  protected chargerType: string | undefined;              //[data]충전기 Type
  protected telNumber: string | undefined;                //[data]단말번호
  protected chargerStatus: string | undefined;            //[data]충전기 Status
  protected memberNumber: string | undefined;             //[data]회원번호
  protected channel: string | undefined;                  //[data]서버통신채널
  protected filler: string | undefined;                   //[data]FILLER

  constructor(orignalData: string, exclusionType: string) {
    this.id = orignalData.substring(0, 2);
    this.length = parseInt(orignalData.substring(0, 2));
    this.receiveTime = orignalData.substring(0, 2);
    this.chargerType = orignalData.substring(0, 2);
    this.telNumber = orignalData.substring(0, 2);
    this.chargerStatus = orignalData.substring(0, 2);
    this.memberNumber = orignalData.substring(0, 2);
   
    switch (exclusionType) {
      case 'E':
        this.channel = orignalData.substring(0, 2);
        this.filler = orignalData.substring(0, 2);
        break;
      case 'J':
        this.channel = orignalData.substring(0, 2);
        this.filler = orignalData.substring(0, 2);
        break;
      case 'K':
        //this.channel = orignalData.substring(0, 2);
        this.filler = orignalData.substring(0, 2);
        break;
      default:
    }
    
  }

}
