
export class CommonBase1 {
  protected id: string | undefined;                       //[header]INS
  protected length: number | undefined;                   //[header]ML
  protected receiveTime: string | undefined;              //[data]수집일시
  protected chargerType: string | undefined;              //[data]충전기 Type
  protected telNumber: string | undefined;                //[data]단말번호
  protected chargerStatus: string | undefined;            //[data]충전기 Status
  protected chargerCableStatus: string | undefined;       //[data]충전케이블상태
  protected chargingStrangeStatus: string | undefined;    //[data]충전이상상태
  protected versionInfoFW: string | undefined;            //[data]버전정보(F/W)
  protected versionInfoHW: string | undefined;            //[data]버전정보(H/W)
  protected versionInfoVO: string | undefined;            //[data]버전정보(음성)
  protected envVarVersion: string | undefined;            //[data]환경변수버전
  protected reservationNumber: string | undefined;        //[data]예약번호
  protected btnTouchYN: string | undefined;               //[data]버튼터치 여부
  protected rficCard: string | undefined;                 //[data]RF/IC CARD
  protected chargerUseElectricPower: string | undefined;  //[data]충전기 사용 전력량
  protected cumulativeCharge: string | undefined;         //[data]누적충전량
  protected eventCode: string | undefined;                //[data]이벤트코드
  protected rsSignalStrength: string | undefined;         //[data]RS신호세기
  protected channel: string | undefined;                  //[data]서버통신채널
  protected momentCharge: string | undefined;             //[data]순간충전량
  protected chargerInternalTemperature: string | undefined;         //[data]충전기내부온도
  protected coolingDevice: string | undefined;            //[data]냉각장치
  protected filler: string | undefined;                   //[data]FILLER

  constructor(orignalData: string, exclusionType: string) {
    this.id = orignalData.substring(0, 2);
    this.length = parseInt(orignalData.substring(0, 2));
    this.receiveTime = orignalData.substring(0, 2);
    this.chargerType = orignalData.substring(0, 2);
    this.telNumber = orignalData.substring(0, 2);
    this.chargerStatus = orignalData.substring(0, 2);
    this.chargerCableStatus = orignalData.substring(0, 2);
    this.chargingStrangeStatus = orignalData.substring(0, 2);
    this.versionInfoFW = orignalData.substring(0, 2);
    this.versionInfoHW = orignalData.substring(0, 2);
    this.versionInfoVO = orignalData.substring(0, 2);
    this.envVarVersion = orignalData.substring(0, 2);
    this.reservationNumber = orignalData.substring(0, 2);
    this.btnTouchYN = orignalData.substring(0, 2);
    this.rficCard = orignalData.substring(0, 2);
    this.chargerUseElectricPower = orignalData.substring(0, 2);
    this.cumulativeCharge = orignalData.substring(0, 2);
    this.eventCode = orignalData.substring(0, 2);
    this.rsSignalStrength = orignalData.substring(0, 2);
    
    switch (exclusionType) {
      case 'E':
        //this.channel = orignalData.substring(0, 2);
        //this.momentCharge = orignalData.substring(0, 2);
        //this.chargerInternalTemperature = orignalData.substring(0, 2);
        //this.coolingDevice = orignalData.substring(0, 2);
        this.filler = orignalData.substring(0, 2);
        break;
      case 'J':
        this.channel = orignalData.substring(0, 2);
        this.momentCharge = orignalData.substring(0, 2);
        this.chargerInternalTemperature = orignalData.substring(0, 2);
        this.coolingDevice = orignalData.substring(0, 2);
        this.filler = orignalData.substring(0, 2);
        break;
      case 'K':
        this.channel = orignalData.substring(0, 2);
        this.momentCharge = orignalData.substring(0, 2);
        this.chargerInternalTemperature = orignalData.substring(0, 2);
        this.coolingDevice = orignalData.substring(0, 2);
        this.filler = orignalData.substring(0, 2);
        break;
      default:
    }
    
  }

}
