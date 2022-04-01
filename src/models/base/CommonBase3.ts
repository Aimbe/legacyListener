
export class CommonBase3 {
  protected id: string | undefined;                       //[header]INS
  protected length: number | undefined;                   //[header]ML
  protected receiveTime: string | undefined;              //[data]수집일시
  protected chargerType: string | undefined;              //[data]충전기 Type
  protected telNumber: string | undefined;                //[data]단말번호
  protected chargerStatus: string | undefined;            //[data]충전기 Status
  protected chargerUseElectricPower: string | undefined;  //[data]충전기사용전력량
  protected memberType: string | undefined;               //[data]회원구분
  protected memberNumber: string | undefined;             //[data]회원번호
  protected chargingStartEnd: string | undefined;         //[data]충전시작/종료
  protected reservationNumber: string | undefined;        //[data]예약번호
  protected approvalNumber: string | undefined;           //[data]승인번호
  protected paymentAmount: string | undefined;            //[data]결제금액
  protected transactionNumber: string | undefined;        //[data]거래번호(TID)
  protected channel: string | undefined;                  //[data]서버통신채널
  protected filler: string | undefined;                   //[data]FILLER

  constructor(orignalData: string, exclusionType: string) {
    this.id = orignalData.substring(0, 2);
    this.length = parseInt(orignalData.substring(2, 12));
    this.receiveTime = orignalData.substring(0, 2);
    this.chargerType = orignalData.substring(0, 2);
    this.telNumber = orignalData.substring(0, 2);
    this.chargerStatus = orignalData.substring(0, 2);
    this.chargerUseElectricPower = orignalData.substring(0, 2);
    this.memberType = orignalData.substring(0, 2);
    this.memberNumber = orignalData.substring(0, 2);
    
    switch (exclusionType) {
      case 'E':
        //this.chargingStartEnd = orignalData.substring(0, 2);
        this.reservationNumber = orignalData.substring(0, 2);
        this.approvalNumber = orignalData.substring(0, 2);
        this.paymentAmount = orignalData.substring(0, 2);
        this.transactionNumber = orignalData.substring(0, 2);
        this.channel = orignalData.substring(0, 2);
        this.filler = orignalData.substring(0, 2);
        break;
      case 'J':
        //this.chargingStartEnd = orignalData.substring(0, 2);
        this.reservationNumber = orignalData.substring(0, 2);
        this.approvalNumber = orignalData.substring(0, 2);
        this.paymentAmount = orignalData.substring(0, 2);
        this.transactionNumber = orignalData.substring(0, 2);
        this.channel = orignalData.substring(0, 2);
        this.filler = orignalData.substring(0, 2);
        break;
      case 'K':
        this.chargingStartEnd = orignalData.substring(0, 2);
        this.reservationNumber = orignalData.substring(0, 2);
        //this.approvalNumber = orignalData.substring(0, 2);
        //this.paymentAmount = orignalData.substring(0, 2);
        //this.transactionNumber = orignalData.substring(0, 2);
        //this.channel = orignalData.substring(0, 2);
        this.filler = orignalData.substring(0, 2);
        break;
      default:
    }
    
  }

}
