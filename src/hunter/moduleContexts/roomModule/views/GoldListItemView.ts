import FUIGoldListItemView from "../../../fui/roomScene/FUIGoldListItemView";
import ReturnToLobbyCommand from "../../loginModule/commands/ReturnToLobbyCommand";

export class GoldListItemView extends FUIGoldListItemView {
    public constructor() {
		super();
	}

	protected constructFromXML(xml: any): void {
		super.constructFromXML(xml);
    }
    
    public maxCoinNum: number = 20;
    private coins: fairygui.GImage[] = [];
    setMoney(coin: number, bulletCost: number) {
        this.resetCoins();
        this.m_coinTxt.text = '+' + coin.toFixed(2);
        let coinNum = Math.floor(coin / bulletCost);
        if(coinNum > this.maxCoinNum) coinNum = this.maxCoinNum; 
        if(coinNum > 0 ) {
            for(let i = 0; i < coinNum - 1; i++) { //组件自带一个金币
                this.coins.push(this.getCoinImg());
            }
        }
        this.arrangeCoinPos();
    }

    clear() {
        this.m_coinTxt.y = this.m_bottmCoin.y - 10;
        this.m_coinTxt.text = '';
        this.resetCoins();
    }

    dispose() {
        super.dispose();
        this.resetCoins();
    }

   private arrangeCoinPos() {
        let bottomCoinPos: Laya.Point = new Laya.Point(this.m_bottmCoin.x, this.m_bottmCoin.y);
        this.coins.forEach((coin, idx) => {
            this.addChildAt(coin, this.numChildren - 1);
            coin.x = bottomCoinPos.x;
            coin.y = bottomCoinPos.y - (idx + 1) * 4;
            this.m_coinTxt.y = coin.y - 10;
        });
    }

    private resetCoins() {
        if(!this.coins) return;
        this.coins.forEach((coin: fairygui.GImage) => {
            coin && coin.removeFromParent();
            this.recoverCoinImg(coin);
        });
        this.coins = [];
    }

    private readonly coinSignal: string = 'COIN_SIGNAL';
    private getCoinImg(): fairygui.GImage {
        return rigger.service.PoolService.instance.getItemByCreateFun(this.coinSignal, this.createCoinImg);
    }

    private recoverCoinImg(img: fairygui.GImage) {
        rigger.service.PoolService.instance.recover(this.coinSignal, img);
    }

    private createCoinImg() {
        return fairygui.UIPackage.createObject('roomScene', 'brdr_ycjm_icon_jinbi') as fairygui.GImage ;
    }
 }