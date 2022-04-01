
export class Fileds {
  protected id: string | undefined;                       //[header]INS
  protected length: number | undefined;                   //[header]ML
  protected receiveTime: string | undefined;              //[data]수집일시
  protected chargerType: string | undefined;              //[data]충전기Type
  protected telNumber: string | undefined;                //[data]단말번호
  protected chargerStatus: string | undefined;            //[data]충전기Status
  protected chargerCableStatus: string | undefined;       //[data]충전기케이블상태
  protected chargingStrangeStatus: string | undefined;    //[data]충전이상상태
  protected versionInfoFW: string | undefined;            //[data]버전정보(F/W)
  protected versionInfoHW: string | undefined;            //[data]버전정보(H/W)
  protected versionInfoVO: string | undefined;            //[data]버전정보(음성)
  protected envVarVersion: string | undefined;            //[data]환경변수버전
  protected reservationNumber: string | undefined;        //[data]예약번호
  protected btnTouchYN: string | undefined;               //[data]버튼터치여부
  protected rficCard: string | undefined;                 //[data]RF/ICCARD
  protected chargerUseElectricPower: string | undefined;  //[data]충전기사용전력량
  protected cumulativeCharge: string | undefined;         //[data]누적충전량
  protected eventCode: string | undefined;                //[data]이벤트코드
  protected rsSignalStrength: string | undefined;         //[data]RS신호세기
  protected channel: string | undefined;                  //[data]서버통신채널
  protected momentCharge: string | undefined;             //[data]순간충전량
  protected chargerInternalTemperature: string | undefined; //[data]충전기내부온도
  protected coolingDevice: string | undefined;            //[data]냉각장치
  protected memberType: string | undefined;               //[data]회원구분
  protected memberNumber: string | undefined;             //[data]회원번호
  protected chargingStartEnd: string | undefined;         //[data]충전시작/종료
  protected approvalNumber: string | undefined;           //[data]승인번호
  protected paymentAmount: string | undefined;            //[data]결제금액
  protected transactionNumber: string | undefined;        //[data]거래번호(TID)
  protected transactionTime: string | undefined;          //[data]거래일시
  protected responseCode: string | undefined;             //[data]응답코드
  protected chargingAmount: string | undefined;           //[data]충전금액
  protected chargingElectricPower: string | undefined;    //[data]충전전력량
  protected downloadFWInfo: string | undefined;           //[data]다운로드할버전정보(F/W)
  protected sectorNumber: string | undefined;             //[data]F/W섹터번호
  protected filler: string | undefined;                   //[data]FILLER

}
