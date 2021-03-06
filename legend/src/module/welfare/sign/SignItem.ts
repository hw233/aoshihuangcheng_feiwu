module game {
	export class SignItem extends eui.ItemRenderer{

		public img_hasSigned:eui.Image;
		public baseItem:customui.BaseItem;
		public img_buqian:eui.Image;
		public img_qian:eui.Image;
		public gp_vip:eui.Group;
		public img_vipBg1:eui.Image;
		public bitmap_vip1:eui.BitmapLabel;
		public bitmap_vip2:eui.BitmapLabel;

		private _signItemVo:SignItemVo;		
		private _movieClip:EffectMovieClip;
		private _vipArr:Array<string> = [null,null,"双","三","四"];

		public constructor() {
			super();
			this.skinName = "SignItemSkin";
			this.addEventListener(egret.TouchEvent.TOUCH_TAP,this.touchHandler,this);
		}
		protected dataChanged():void {
			this._signItemVo = this.data;

			//baseItem显示
			var itemArr = this._signItemVo.signConfig["reward"][0];
			var type = itemArr[0];
			var good_id = itemArr[1];
			var num = itemArr[2];
			this.baseItem.updateBaseItem(type,good_id,num);
			this.baseItem.setStopShowTips(true);
			// this.baseItem.lb_num.visible = true;

			//vip几奖励显示
			var vipLv:number = this._signItemVo.signConfig["vip"];
			if(vipLv<=0)
			{
				this.gp_vip.visible = false;
			}else
			{
				this.gp_vip.visible = true;
				this.bitmap_vip1.text = vipLv + "";
				this.bitmap_vip2.text = this._vipArr[this._signItemVo.signConfig["multiple"]];
			}

			//已签到、可签到
			switch(this._signItemVo.status) {
				//已经签到了的
				case ConstSignItemStatus.hasSigned:
						this.img_buqian.visible = false;
						this.img_qian.visible = false;
						this.img_hasSigned.visible = true;
						if(this._movieClip)
						{
							this._movieClip.parent.removeChild(this._movieClip);
							this._movieClip.destroy();
							this._movieClip = null;
						}
						break;
				//可以签到的
				case ConstSignItemStatus.canSign:
						this.img_buqian.visible = false;
						this.img_qian.visible = true;
						this.img_hasSigned.visible = false;
						if(this._signItemVo.canSign)
						{	
							if(this._movieClip == null){
								this._movieClip = new EffectMovieClip();
								this._movieClip.frameRate = 1;
								this._movieClip.x = this.width / 2;
								this._movieClip.scaleX = 1.4;
								this._movieClip.scaleY = 1.4;
								this._movieClip.y = this.height / 2;
								this._movieClip.playMCKey("efficon","",-1,null,()=>{
										if(this._movieClip)
										{
											this._movieClip.frameRate = 8;
										}
									}
								,null,this);
								this.addChild(this._movieClip);
							}
						}
						break;
				//补签的
				// case ConstSignItemStatus.reSign:
				// 		this.img_qian.visible = false;
				// 		this.img_hasSigned.visible = false;
				// 		if(this._signItemVo.canResign)
				// 		{
				// 			this.img_buqian.visible = true;
				// 		}else{
				// 			this.img_buqian.visible = false;
				// 		}
				// 		break;
				//还不能签到的
				case ConstSignItemStatus.notSign:
						this.img_buqian.visible = false;
						this.img_qian.visible = false;
						this.img_hasSigned.visible = false;
						break;
				default:
						break;
			}
		}

		private touchHandler():void {
			switch(this._signItemVo.status)
			{
				case ConstSignItemStatus.hasSigned:
						//查看物品信息
						this.showItem();
						break;
				case ConstSignItemStatus.canSign:
						//弹签到框
						if(this._signItemVo.canSign)
						{
							this.toSign();
						}else{
							App.GlobalTips.showTips("请先领取上一个奖励");
						}
						break;
				// case ConstSignItemStatus.reSign:
				// 		//弹补签提示框
				// 		if(this._signItemVo.canResign)
				// 		{
				// 			this.toResign();
				// 		}else{
				// 			if(this.img_buqian.visible == true)
				// 			{
				// 				App.GlobalTips.showTips("请先领取上一个奖励");
				// 			}else{
				// 				//查看物品信息
				// 				this.showItem();
				// 			}
				// 		}
				// 		break;
				case ConstSignItemStatus.notSign:
						//查看物品信息
						this.showItem();
						break;
				default:
						break;
			}
		}

		/**
		 * 签到
		 */
		private toSign():void {	
			if(App.RoleManager.roleInfo.vipLv < this._signItemVo.signConfig["vip"])
			{	
				//弹vip充值框
				WinManager.getInstance().openPopWin(WinName.POP_SIGN_VIP,[this._signItemVo.signConfig,23002]);
			}else{
				App.Socket.send(23002,{});
			}
		}

		/**
		 * 补签
		 */
		private toResign():void {
			let okCB = function (selected) {
				if(App.RoleManager.roleInfo.vipLv < this._signItemVo.signConfig["vip"])
				{	
					//弹vip充值框
					WinManager.getInstance().openPopWin(WinName.POP_SIGN_VIP,[this._signItemVo.signConfig,23003]);
					// var view = new SignVipPrompt(this._signItemData,23003);
					// PopUpManager.addPopUp({obj:view});
				}else{
					App.Socket.send(23003,{});
				}
			}
			let cancelCB = function () {
				// console.log("cancellll");
			}
			var costMoney:Object = ConfigManager.getInstance().getConstConfigByType("SIGN_MONEY");
			let textFlow = [{ text:"是否花费" ,style: { textColor: 0xeb0601 }},{text:costMoney["value"] + "元宝",style: { textColor: 0xffd800 }},
			{text: "补签",style: { textColor: 0xeb0601 }}];
			App.GlobalTips.showAlert({ style: AlertTipsStyle.COMMON, textFlow: textFlow, okCB: okCB, cancelCB: cancelCB, context: this, needCheckBox: false });
		}

		/**
		 * 点击显示物品详细信息
		 */
		private showItem():void
		{	
			var rewardArr:Array<any> = this._signItemVo.signConfig["reward"][0];
			var type:number =rewardArr[0];
			var good_id:number = rewardArr[1];
			App.GlobalTips.showItemTips(type,good_id,null);
		}

 	}
}
