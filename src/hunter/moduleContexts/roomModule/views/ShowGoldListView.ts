import FUIShowGoldListView from "../../../fui/roomScene/FUIShowGoldListView";
import { GoldListItemView } from "./GoldListItemView";
import FUIGoldListItemView from "../../../fui/roomScene/FUIGoldListItemView";
import PlayerManager from "../models/PlayerManager";
import PlayerModel from "../../playerModule/models/PlayerModel";

export class ShowGoldListView extends FUIShowGoldListView {
    @riggerIOC.inject(PlayerModel)
    private playerModel: PlayerModel;

    public constructor() {
		super();
	}

	protected constructFromXML(xml: any): void {
        super.constructFromXML(xml);
    }

    //移动方向 1:left  -1:right
    private moveDirection: number = 1; 
    init(pos: number) {
        if([1, 3].indexOf(pos) != -1) {
            //left
            this.firstPos = new Laya.Point(0, 115);
            this.moveDirection = 1;
        }
        else {
            this.firstPos = new Laya.Point(406, 115);
            this.moveDirection = -1;
        }
    }

    dispose() {
        super.dispose();
        this.goldItems && this.goldItems.forEach((item) => {
            item && this.recoverGoldItemView(item);
        });
        this.excessGoldItems && this.excessGoldItems.forEach((item) => {
            item && this.recoverGoldItemView(item);
        })
        this.goldItems = [];
        this.excessGoldItems = [];
        Laya.timer.clearAll(this);
    }

    private goldItems: GoldListItemView[] = [];
    private showMaxNum: number = 7;
    private excessGoldItems: GoldListItemView[] = [];
    pushGoldItems(coin: number, bulletCost: number) {
        let goldItem = this.getGoldItemView();
        goldItem.setMoney(coin, bulletCost);
        if(this.goldItems.length == 0) {
            goldItem.x = this.firstPos.x;
            goldItem.y = this.firstPos.y;
        }
        else {
            goldItem.x = this.firstPos.x + this.moveDirection * (goldItem.width + this.spaceX) * this.goldItems.length;
            goldItem.y = this.goldItems[this.goldItems.length - 1].y;
        }

        if(this.goldItems && this.goldItems.length >= this.showMaxNum) {
            this.excessGoldItems.push(goldItem); //当前显示金币数量已达上限,存储到额外的金币数组
        }
        else {
            this.goldItems.push(goldItem);
            this.addChild(goldItem);
            this.moveGoldItems();
        }
    }

    private isMoving: boolean = false;
    moveGoldItems() {
        if(this.goldItems && this.goldItems.length < this.showMaxNum && this.excessGoldItems && this.excessGoldItems[0]) {
            this.goldItems.push(this.excessGoldItems[0]);
            this.addChild(this.excessGoldItems[0]);
            this.adjustPos();
            this.excessGoldItems.splice(0, 1);
        }
        if(this.isMoving) return;
        if(this.goldItems && this.goldItems.length >= 1) {
            this.isMoving = true;
            Laya.timer.clearAll(this);
            Laya.timer.once(1000, this, () => {
                this.ratio = 0;
                Laya.Tween.to(this, {ratio: 1}, 500, null, Laya.Handler.create(this, () => {
                    this.goldItems[0] && this.recoverGoldItemView(this.goldItems[0]);
                    this.goldItems.splice(0, 1);
                    this.isMoving = false;
                    this.moveGoldItems();
                }));
            });
        }
    }

    private get ratio(): number { return this._ratio };
    private set ratio(v: number) {
        this._ratio = v;
        if(this.goldItems[0]) {
            this.goldItems[0].x = this.firstPos.x + (-1) *this.moveDirection * (this.goldItems[0].width + this.spaceX) * v;
            this.goldItems[0].alpha = 1 - v;
            this.adjustPos();
        }
    }
    private _ratio: number = 0;

    private firstPos: Laya.Point;
    private spaceX: number = 8;
    private adjustPos() {
        if(!this.goldItems || this.goldItems.length <= 0) return;
        let self = this;
        this.goldItems.forEach((item, idx, items) => {
            item.y = self.firstPos.y;
            if(idx > 0) {
                item.x = items[idx - 1].x + (item.width + self.spaceX) * self.moveDirection;
            }
        });
    }

    private readonly GoldListItemSignal: string = 'GOLD_LIST_ITEM_SIGNAL';
    private getGoldItemView(): GoldListItemView {
        return rigger.service.PoolService.instance.getItemByCreateFun(this.GoldListItemSignal, this.createGoldItem);
    }

    private recoverGoldItemView(item: GoldListItemView) {
        if(item) {
            item.alpha = 1;
            item.clear();
            item.removeFromParent();
        }
        rigger.service.PoolService.instance.recover(this.GoldListItemSignal, item);
    }

    private createGoldItem(): GoldListItemView {
        let goldItem = FUIGoldListItemView.createInstance() as GoldListItemView;
        return goldItem;
    }
}