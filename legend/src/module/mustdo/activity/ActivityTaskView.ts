/**
 * Author: lihe
 * Email： hersletter@qq.com
 * 活跃任务界面 2017/06/20.
 */
module game {

    /**
     *  活跃度任务界面
     */
    export class ActivityTaskView extends BaseChildView {

        public scr_task: eui.Scroller;
        public pgbar_activity: eui.ProgressBar;
        public list_chest: Array<ActivityRewardItem> = [];
        public activity_reward1: ActivityRewardItem;
        public activity_reward2: ActivityRewardItem;
        public activity_reward3: ActivityRewardItem;
        public activity_reward4: ActivityRewardItem;
        private _listtask: eui.List = new eui.List();
        private _eventid_activity: number = 0;
        private _mustdomodel: MustDoModel = MustDoModel.getInstance();
        
        public constructor(skinName: string) {
            super("ActivityTaskSkin")
        }

        protected childrenCreated() {
            super.childrenCreated();
            //this.isCreated = true;

            this.scr_task.viewport = this._listtask;
            this.scr_task.scrollPolicyH = eui.ScrollPolicy.OFF;
            this._listtask.itemRenderer = TaskItem;
            this.list_chest.push(this.activity_reward1);
            this.list_chest.push(this.activity_reward2);
            this.list_chest.push(this.activity_reward3);
            this.list_chest.push(this.activity_reward4);

        }

        /**
         * 打开窗口
         */
        public open(openParam: any = null): void {
            super.open(openParam);
            if (this._eventid_activity == 0)
                this._eventid_activity = App.EventSystem.addEventListener(PanelNotify.MUSTDO_UPDATEACTIVITY, this.updateActivity, this);

            for (let i = 0; i < this.list_chest.length; i++) {

                this.list_chest[i].addRewardEff();
            }
            App.Socket.send(18001, null);
        }

        /**
         * 清理
         */
        public clear(data: any = null): void {
            super.clear();
            if (this._eventid_activity != 0) {
                App.EventSystem.removeEventListener(PanelNotify.MUSTDO_UPDATEACTIVITY, this._eventid_activity);
                this._eventid_activity = 0;
            }

            for (let i = 0; i < this.list_chest.length; i++) {

                this.list_chest[i].clearRewardEff();
            }
        }
        /**
         * 销毁
         */
        public destroy(): void {
            super.destroy();

        }


        public updateActivity() {

            this._listtask.dataProvider = new eui.ArrayCollection(this._mustdomodel.taskList);
            this.pgbar_activity.value = this._mustdomodel.livenessNum; //* 100 / 120.00;
            this.pgbar_activity.maximum = 120;

            for (let i = 0; i < 4; i++) {


                if (i < this._mustdomodel.chestList.length) {

                    this.list_chest[i].livenesss = this._mustdomodel.chestList[i].liveness;
                    this.list_chest[i].item_id = this._mustdomodel.chestList[i].reward_id;
                    this.list_chest[i].item_num = this._mustdomodel.chestList[i].reward_num;
                    this.list_chest[i].state = this._mustdomodel.chestList[i].state;
                    this.list_chest[i].updateReward();
                }

            }

        }
    }


    export class ActivityRewardItem extends eui.ItemRenderer {

        public baseItem: customui.BaseItem;
        public btn_take: eui.Image;
        public img_token: eui.Image;
        public livenesss: number;
        public item_id: number;
        public item_num: number;
        public state: number; //0:不可领 1：可领 2：已领
        private _canGetMc: AMovieClip;//

        public constructor() {
            super();
            this.skinName = "ActivityRewardItem";
            this.btn_take.addEventListener(egret.TouchEvent.TOUCH_TAP, () => {
                this.getAcyivityReward();
            }, this);

            if (this._canGetMc == null) {
                this._canGetMc = new AMovieClip();
                this._canGetMc.x = this.img_token.x + 115 / 2;
                this._canGetMc.y = this.img_token.y + 31 / 2;
                this._canGetMc.touchEnabled = false;
                this.addChildAt(this._canGetMc, 1);
            }

            this.baseItem.lb_name.visible = false;
            this.baseItem.img_frame.visible = false;
            this.baseItem.img_icon.touchEnabled = false;
        }

        public getAcyivityReward() {

            if (this.state != 1) {
                App.GlobalTips.showItemTips(ClientType.BASE_ITEM, this.item_id, null);
                return;
            }

            if ((MustDoModel.getInstance() as MustDoModel).livenessNum >= this.livenesss)
                App.Socket.send(18003, { liveness: this.livenesss });

        }

        public updateReward() {

            this.baseItem.updateBaseItem(ClientType.BASE_ITEM, this.item_id);
            this.baseItem.lb_name.visible = false;
            this.baseItem.img_frame.visible = false;
            this.baseItem.img_frame.width = 0;
            this.baseItem.img_icon.touchEnabled = false;
            this.baseItem.lb_num.visible = true;
            this.baseItem.lb_num.text = this.item_num + "";

            switch (this.state) {
                case 0:
                    this.img_token.visible = false;
                    this._canGetMc.stop();
                    this._canGetMc.visible = false;
                    break;

                case 1:
                    this.img_token.visible = false;
                    this._canGetMc.visible = true;
                    this._canGetMc.playMCKey("efficonyuan", "", -1, null, () => {
                        this._canGetMc.frameRate = 8;
                    }, this);
                    break;

                case 2:
                    this.img_token.visible = true;
                    this._canGetMc.stop();
                    this._canGetMc.visible = false;
                    break;

            }
        }
        public addRewardEff() {
            if (this._canGetMc == null) {
                this._canGetMc = new AMovieClip();
                this._canGetMc.x = this.img_token.x + 115 / 2;
                this._canGetMc.y = this.img_token.y + 31 / 2;
                this._canGetMc.touchEnabled = false;
                this.addChildAt(this._canGetMc, 1);
            }
        }
        public clearRewardEff() {

            if (this._canGetMc) {
                this._canGetMc.visible = false;
                this._canGetMc.stop();
                this._canGetMc.destroy();
                this._canGetMc = null;
            }
        }
    }

}