/**
 * module: 累计充值
 * author : yangyipeng
*/
module game {
	export class ActivityTotalRecharge extends BaseChildView {
		
		public btn_recharge:eui.Button;
		public btn_reward:eui.Button;
		public lb_leftTime:eui.Label;
		public lb_gold:eui.Label;
		public lb_rechargeDesc:eui.Label;
		public lb_desc:eui.Label;
		public baseItem0:customui.BaseItem;
		public baseItem1:customui.BaseItem;
		public baseItem2:customui.BaseItem;
		public baseItem3:customui.BaseItem;
		public baseItem4:customui.BaseItem;
		public baseItem5:customui.BaseItem;
		public gp_recharge:eui.Group;
		private _intervalId:number = 0;

		public constructor(skinName: string) {
			super(skinName);
			this.skinName = ActivityTotalRechargeSkin;
		}

		protected childrenCreated() {
			super.childrenCreated();
			// this.btn_recharge.addEventListener(egret.TouchEvent.TOUCH_TAP,this.handlerRecharge,this);
			this.btn_reward.addEventListener(egret.TouchEvent.TOUCH_TAP,this.handlerReward,this);
			this.gp_recharge.addEventListener(egret.TouchEvent.TOUCH_TAP,()=>{
				RechargeOpenManager.getInstance().openRechargeView();
			},this)
		}


		private handlerReward():void
		{	
			var state:number = (ActivityModel.getInstance() as ActivityModel).totalRechargeInfo["state"];// 状态 （0不能领 1可领 2已领）
			switch(state)
			{
				case 0:
					 break;
				case 1:
					App.Socket.send(30009,{}); //领取奖励
					break;
				case 2:
					break;
				default:
					break;
			}
		}

		public updateView() {
			
			var config = ConfigManager.getInstance().getRechargeGiftInfoById(5);
			var reward:Array<any> = config["reward"];
			for(var i:number=0;i<reward.length;i++)
			{	
				var type = reward[i][0];
				var id = reward[i][1];
				var num = reward[i][2];
				(this["baseItem" + i] as customui.BaseItem).updateBaseItem(type,id,num);
				(this["baseItem" + i] as customui.BaseItem).setItemNameVisible(true);
			}

			this.lb_rechargeDesc.textFlow = [{text:"累冲"},{text:config["add_gold"],style:{textColor:0xffea00}},
			{text:"元宝即可获得"},{text:"材料礼包",style:{textColor:0xffea00}}] ;

			this.lb_desc.textFlow = [{text:"活动说明：",style:{textColor:0xf87500}},{text:"开服1-7天累计充值满" + config["add_gold"] + "可领取",style:{textColor:0xB6B1AE}}]

			//倒计时
			if(this._intervalId) {
				App.GlobalTimer.remove(this._intervalId);
			}
			var leftTime:number = (ActivityModel.getInstance() as ActivityModel).totalRechargeInfo["left_time"];
			(this.lb_leftTime as eui.Label).textFlow =[{text:"剩余时间：",style:{textColor:0xf87500}},{text:InvestUtil.getFormatBySecond1(leftTime),style:{textColor:0x11E428}}] ;
			if(leftTime <= 0 ) {
				(this.lb_leftTime as eui.Label).textFlow =[{text:"剩余时间：",style:{textColor:0xf87500}},{text:InvestUtil.getFormatBySecond1(0),style:{textColor:0x11E428}}] ;
				App.Socket.send(30008,{});
			}else {
				(this.lb_leftTime as eui.Label).textFlow =[{text:"剩余时间：",style:{textColor:0xf87500}},{text:InvestUtil.getFormatBySecond1(leftTime),style:{textColor:0x11E428}}] ;
				App.GlobalTimer.addSchedule(1000,leftTime,this.updateTime,this,()=>{
					App.GlobalTimer.remove(this._intervalId);
					App.Socket.send(30008,{});
					this._intervalId = null;
				},this)
			}

			//充值元宝 
			var charge:number = (ActivityModel.getInstance() as ActivityModel).totalRechargeInfo["charge"];
			this.lb_gold.text = "已充值：" + charge + "/" + config["add_gold"] + "元宝";
		}

		private updateTime():void {
			(ActivityModel.getInstance() as ActivityModel).totalRechargeInfo["left_time"]--;
			var leftTime = (ActivityModel.getInstance() as ActivityModel).totalRechargeInfo["left_time"];
			(this.lb_leftTime as eui.Label).textFlow =[{text:"剩余时间：",style:{textColor:0xf87500}},{text:InvestUtil.getFormatBySecond1(leftTime),style:{textColor:0x11E428}}] ;
		}

		/**
		 * 打开窗口
		 */
		public open(openParam: any = null): void {
			super.open(openParam);
			//请求后台数据
			App.Socket.send(30008,{});
		}

		/**
		 * 清理
		 */
		public clear(data: any = null): void {
			super.clear(data);
			if(this._intervalId != 0)
			{
				clearInterval(this._intervalId);
				this._intervalId = 0;
			}
		}
		/**
		 * 销毁
		 */
		public destroy(): void {
			super.destroy();
		}
	}



}