
export class CommonBase6 {
  protected id: string | undefined;                       //[header]INS
  protected length: number | undefined;                   //[header]ML
  protected receiveTime: string | undefined;              //[data]수집일시
  protected chargerType: string | undefined;              //[data]충전기 Type
  protected telNumber: string | undefined;                //[data]단말번호
  protected memberType: string | undefined;               //[data]회원구분
  protected memberNumber: string | undefined;             //[data]회원번호
  protected reservationNumber: string | undefined;        //[data]예약번호
  protected transactionTime: string | undefined;          //[data]거래일시
  protected responseCode: string | undefined;             //[data]응답코드
  protected approvalNumber: string | undefined;           //[data]승인번호
  protected paymentAmount: string | undefined;            //[data]결제금액
  protected chargingElectricPower: string | undefined;    //[data]충전전력량
  protected cumulativeCharge: string | undefined;         //[data]누적충전량
  protected filler: string | undefined;                   //[data]FILLER

  constructor(orignalData: string, exclusionType: string) {
    this.id = orignalData.substring(0, 2);
    this.length = parseInt(orignalData.substring(0, 2));
    this.receiveTime = orignalData.substring(0, 2);
    this.chargerType = orignalData.substring(0, 2);
    this.telNumber = orignalData.substring(0, 2);
    this.memberType = orignalData.substring(0, 2);
    this.memberNumber = orignalData.substring(0, 2);
    this.reservationNumber = orignalData.substring(0, 2);
    this.transactionTime = orignalData.substring(0, 2);
    this.responseCode = orignalData.substring(0, 2);
    this.approvalNumber = orignalData.substring(0, 2);
    this.paymentAmount = orignalData.substring(0, 2);
    this.chargingElectricPower = orignalData.substring(0, 2);
    this.cumulativeCharge = orignalData.substring(0, 2);
    this.filler = orignalData.substring(0, 2);
    
    switch (exclusionType) {
      case 'E':
        //6 전문은 E만 사용중 
        break;
      case 'J':
        //6 전문은 E만 사용중
        break;
      case 'K':
        //6 전문은 E만 사용중
        break;
      default:
    }
    
  }

}
