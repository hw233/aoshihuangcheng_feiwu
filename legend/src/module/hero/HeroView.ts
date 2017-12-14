/**
 * module : 英雄模块
 * author ：zrj
*/
module game {
	export class HeroView extends BaseView {
		public gp_main: eui.Group;
		public gp_equip: eui.Group;
		public gp_skill: eui.Group;
		public gp_reborn: eui.Group;
		public img_close: eui.Image;
		public btn_skill: eui.Button;
		public btn_role: eui.Button;
		public btn_ruby: eui.Button;
		public btn_reborn: eui.Button;
		public img_return: eui.Image;
		public skillPanel: SkillPanel;
		public commonWin: customui.CommonWin;
		public bmlb_cap: eui.BitmapLabel;
		public hero_head: HeroHeadComponentView;
		public img_detail: eui.Image;
		public gp_model: eui.Group; //存放模型
		public btn_artifact: eui.Button;
		public btn_orange: eui.Button;

		public img_wing: eui.Image;
		public img_weapon: eui.Image;
		public img_body: eui.Image;

		private _rebornView: RebornView;
		private equipArray: Array<customui.BaseItem> = [];
		private _specialArray: Array<customui.BaseItem> = []; //6件特殊装备
		private _specialArrayEffect: Array<EffectMovieClip> = []; //6件特殊装备
		private heroModel: HeroModel = HeroModel.getInstance();
		private curPos: number = 0;
		private _handleId: number = 0;
		private _skillHandleId: number = 0;

		public constructor(viewConf: WinManagerVO = null) {
			super(viewConf);

		}

		protected childrenCreated() {
			super.childrenCreated();
			RES.getResAsync("equipping_biaoti_png", (texture) => {
				this.commonWin.img_title.texture = texture;
			}, this);
			this.img_close = this.commonWin.img_close;
			this.initView();
		}

		private initView() {
			this.btn_role.addEventListener(egret.TouchEvent.TOUCH_TAP, (e: Event) => {
				// App.WinManager.openWin(WinName.WING);
				this.gp_equip.visible = true;
				this.gp_reborn.visible = false;
				this.gp_skill.visible = false;
				this.btn_role.currentState = "down";
				this.btn_skill.currentState = "up";
				this.btn_reborn.currentState = "up";
				RES.getResAsync("equipping_biaoti_png", (texture) => {
					this.commonWin.img_title.texture = texture;
				}, this);
			}, this);

			this.img_close.addEventListener(egret.TouchEvent.TOUCH_TAP, (e: Event) => {
				App.WinManager.closeWin(WinName.HERO);
			}, this);

			this.img_detail.addEventListener(egret.TouchEvent.TOUCH_TAP, this.openHeroAttribute, this);

			this.btn_ruby.addEventListener(egret.TouchEvent.TOUCH_TAP, (e: Event) => {
				App.WinManager.openWin(WinName.JEWEL);
			}, this);

			this.btn_artifact.addEventListener(egret.TouchEvent.TOUCH_TAP, (e: Event) => {
				App.WinManager.openWin(WinName.ARTIFACT);
			}, this);
			this.btn_orange.addEventListener(egret.TouchEvent.TOUCH_TAP, (e: Event) => {
				App.WinManager.openWin(WinName.RAIDER, { lastModule: WinName.HERO, index: 1 });
			}, this);

			this.btn_skill.addEventListener(egret.TouchEvent.TOUCH_TAP, (e: Event) => {
				this.gp_equip.visible = false;
				this.gp_reborn.visible = false;
				this.gp_skill.visible = true;
				//去拿技能数据
				App.Socket.send(12001, this.heroModel.heroInfo[this.curPos].id);
				this.btn_skill.currentState = "down";
				this.btn_reborn.currentState = "up";
				this.btn_role.currentState = "up";
				RES.getResAsync("skill_title_png", (texture) => {
					this.commonWin.img_title.texture = texture;
				}, this);
			}, this);

			this.btn_reborn.addEventListener(egret.TouchEvent.TOUCH_TAP, (e: Event) => {
				if (!this._rebornView) {
					this._rebornView = new RebornView();
					this.gp_reborn.addChild(this._rebornView);
				}
				this.gp_equip.visible = false;
				this.gp_reborn.visible = true;
				this.gp_skill.visible = false;
				//去拿转生数据
				this.btn_skill.currentState = "up";
				this.btn_reborn.currentState = "down";
				this.btn_role.currentState = "up";
				RES.getResAsync("reborn_zhuansheng_title_png", (texture) => {
					this.commonWin.img_title.texture = texture;
				}, this);
			}, this);

			App.BtnTipManager.addBtnTipItem(ConstBtnTipType.ROLE_SKILL, this.btn_skill);
			App.BtnTipManager.addBtnTipItem(ConstBtnTipType.ROLE_EQUIP, this.btn_role);
			App.BtnTipManager.addBtnTipItem(ConstBtnTipType.ROLE_RUBY, this.btn_ruby);
			App.BtnTipManager.addBtnTipItem(ConstBtnTipType.ROLE_REBORN, this.btn_reborn);
			App.BtnTipManager.addBtnTipItem(ConstBtnTipType.ROLE_ORANGEEQUIP, this.btn_orange);

			this.img_return.addEventListener(egret.TouchEvent.TOUCH_TAP, (e: Event) => {
				if (this.gp_equip.visible) {
					App.WinManager.closeWin(WinName.HERO);
				}
				this.gp_equip.visible = true;
				this.gp_skill.visible = false;
				this.gp_reborn.visible = false;
				this.btn_reborn.currentState = "up";
				this.btn_skill.currentState = "up";
				RES.getResAsync("equipping_biaoti_png", (texture) => {
					this.commonWin.img_title.texture = texture;
				}, this);
			}, this);

			if (this.heroModel.curPos != undefined) {
				this.curPos = this.heroModel.curPos;
			}
			this.btn_role.currentState = "down";
			this.gp_equip.visible = true;
			this.gp_skill.visible = false;
			this.gp_reborn.visible = false;
			this.initEquip();
			this.initSpecialEquip();
			this.updateEquipView();
			this.updateSpecialEquipView();
			this.updateModelView();
			this.validateNow();
		}

		private initEquip() {
			for (let i = 1; i <= 10; i++) {
				let item = new customui.BaseItem();
				item.width = item.height = 90;
				item.img_bg.visible = true;
				if (i % 2 != 0) {
					item.left = 50;
				} else {
					item.right = 50;
				}
				item.y = 34 + (Math.floor((i - 1) / 2) * (item.height + 17));
				//特殊处理衣服和头盔
				if (i == 2) { //衣服
					item.right = undefined;
					item.left = 50;
					item.y = 34 + (Math.floor((i + 1 - 1) / 2) * (item.height + 17));
				} else if (i == 3) { //头盔
					item.left = undefined;
					item.right = 50;
					item.y = 34 + (Math.floor((i - 1 - 1) / 2) * (item.height + 17));
				}

				this.gp_equip.addChild(item);
				item.addEventListener(egret.TouchEvent.TOUCH_TAP, () => {
					if (this.heroModel.heroInfo.length <= this.heroModel.curPos) {
						return;
					}
					this.openEquip(i);
				}, this);
				this.equipArray.push(item);
			}
		}

		private initSpecialEquip() {
			for (let i = 1; i <= 6; i++) {
				let item = new customui.BaseItem();
				item.width = item.height = 90;
				item.img_bg.visible = true;
				if (i <= 4) {
					if (i % 2 != 0) {
						item.left = 160;
					} else {
						item.right = 160;
					}
					item.y = 462 + (Math.floor((i - 1) / 2) * (item.height + 17));

				} else if (i == 5) {
					item.left = 50;
					item.y = 34 + 5 * (item.height + 17);
				} else if (i == 6) {
					item.right = 50;
					item.y = 34 + 5 * (item.height + 17);
				}

				let effect = new EffectMovieClip();
				effect.scaleX = effect.scaleY = 0.4;
				effect.x = 45;
				effect.y = 50;
				effect.touchEnabled = false;
				effect.playMCKey(ConstSpecialEquipEffect[i], "", -1, null, () => {
					effect.frameRate = 8;
				}, null, this);
				item.addChild(effect);

				this._specialArrayEffect.push(effect);
				this.gp_equip.addChild(item);
				item.addEventListener(egret.TouchEvent.TOUCH_TAP, () => {
					this.openSpecialEquip(i);
				}, this);
				this._specialArray.push(item);
			}
		}

		//装备相关
		private openEquip(part) {
			HeroModel.getInstance().curPart = part;
			let info = (HeroModel.getInstance() as HeroModel).getHeroEquipByPosPart(this.curPos, part);
			let type = (EquipModel.getInstance() as EquipModel).getTypeByPos(part);
			let career = this.heroModel.heroInfo[this.heroModel.curPos].job;
			// let career = 1;
			if (info) { //装备中，显示详情
				App.WinManager.openWin(WinName.EQUIP, { type: 1, id: info.good_id, uuid: info.id, part: part });
			} else { //未装备，显示装备选择页面
				let view = new EquipSelect(career, part, this.heroModel.heroInfo[this.heroModel.curPos].sex);
				PopUpManager.addPopUp({ obj: view, effectType: 0 });
			}
		}

		//打开特殊装备
		private openSpecialEquip(part) {
			let info = (HeroModel.getInstance() as HeroModel).getHeroSpecialEquipByPosPart(this.curPos, part);
			if (info && info.id) { //已经激活
				App.WinManager.openWin(WinName.EQUIP_SPECIAL, { part: part, isActive: true });
			} else {
				App.WinManager.openWin(WinName.EQUIP_SPECIAL, { part: part, isActive: false });
			}
		}

		public checkRedDot() {
			this.hero_head.clearAllRedTips();
			if (this.gp_equip.visible) {
				this.heroModel.heroHeadRedDot.forEach((value, index, array) => {
					this.hero_head.setRedTips(index, value);
				}, this)
				//红点显示
				for (let i = 1; i <= 10; i++) {
					if (this.heroModel.heroEquipPartRedDot[this.curPos][i - 1]) {
						this.equipArray[i - 1].showRedTips(true);
					} else {
						this.equipArray[i - 1].hideRedTips();
					}
				}

			} else if (this.gp_skill.visible) {
				SkillModel.getInstance().heroHeadRedDot.forEach((value, index, array) => {
					this.hero_head.setRedTips(index, value);
				}, this)
			}
		}

		public updateView(data) {
			this.curPos = data;
			if (this.gp_equip.visible) {
				this.updateEquipView();
				this.updateSpecialEquipView();
				this.updateModelView();
				// this.checkRedDot();
			} else if (this.gp_skill.visible) {
				this.skillPanel.changeList();
			}
		}

		public updateEquipView() {
			this.checkRedDot();

			if (this.curPos <= this.heroModel.heroInfo.length - 1) {
				this.bmlb_cap.text = String(this.heroModel.heroInfo[this.curPos].score);
			} else {
				this.bmlb_cap.text = "";
			}
			for (let i = 1; i <= 10; i++) {
				let info = (HeroModel.getInstance() as HeroModel).getHeroEquipByPosPart(this.curPos, i);
				if (info) {
					let baseInfo = (EquipModel.getInstance() as EquipModel).getEquipInfoById(info.good_id);
					this.equipArray[i - 1].updateBaseItem(ClientType.EQUIP, baseInfo.id, null, info);
					this.equipArray[i - 1].img_career.visible = false;
					this.equipArray[i - 1].lb_name.text = baseInfo.limit_lvl + "级";
					this.equipArray[i - 1].lb_name.visible = true;
					this.equipArray[i - 1].lb_type.visible = false;
				} else {
					let partInfo = this.heroModel.heroInfo[this.heroModel.curPos].getPartInfoByPart(i);
					this.equipArray[i - 1].updateBaseItem(ClientType.EQUIP, 0, null, partInfo);
					this.equipArray[i - 1].lb_type.visible = true;
					this.equipArray[i - 1].lb_name.visible = false;
					let type = (EquipModel.getInstance() as EquipModel).getTypeByPos(i);
					this.equipArray[i - 1].lb_type.text = ConstEquipType[type];
					let pos = this.curPos;
					RES.getResAsync("equipping_jiahao_png", (texture) => {
						if (this.heroModel.getHeroEquipByPosPart(pos, i)) {
							return;
						}
						this.equipArray[i - 1].img_icon.source = texture;
						this.equipArray[i - 1].img_icon.visible = true;
						this.equipArray[i - 1].img_frame.source = RES.getRes("common_default_png");
					}, this);
				}
			}
		}

		public updateSpecialEquipView() {
			for (let i = 1; i <= 6; i++) {
				let info = (HeroModel.getInstance() as HeroModel).getHeroSpecialEquipByPosPart(this.curPos, i);
				if (info) {
					UIActionManager.setGrey(this._specialArray[i - 1], false);
					this._specialArray[i - 1].updateBaseItem(ClientType.EQUIP, 0, null);
					this._specialArray[i - 1].lb_name.visible = false;
					this._specialArray[i - 1].img_icon.source = "";
				} else {
					// let partInfo = this.heroModel.heroInfo[this.heroModel.curPos].getPartInfoByPart(i);
					UIActionManager.setGrey(this._specialArray[i - 1], true);
					this._specialArray[i - 1].updateBaseItem(ClientType.EQUIP, 0, null);
					this._specialArray[i - 1].lb_name.visible = false;
					this._specialArray[i - 1].img_icon.source = "";

				}
			}
		}

		//更新人物和武器模型
		public updateModelView() {
			let heroInfo = this.heroModel.heroInfo[this.heroModel.curPos];
			let wingId = heroInfo.getWingModelId();
			let weaponId = heroInfo.getWeaponModelId();
			let clothId = heroInfo.getClothModelId();
			if (wingId) {
				RES.getResAsync(wingId + "_png", (texture) => {
					this.img_wing.source = texture;
					this.img_wing.touchEnabled = false;
				}, this);
			} else {
				this.img_wing.source = "";
			}
			if (weaponId) {
				RES.getResAsync(weaponId + "_png", (texture) => {
					this.img_weapon.source = texture;
					this.img_weapon.touchEnabled = false;
				}, this);
			} else {
				this.img_weapon.source = "";
			}
			if (clothId) {
				RES.getResAsync(clothId + "_png", (texture) => {
					this.img_body.source = texture;
					this.img_body.touchEnabled = false;
				}, this);
			} else {
				if (heroInfo.sex == ConstSex.MAN) {
					RES.getResAsync("1700" + "_png", (texture) => {
						this.img_body.source = texture;
						this.img_body.touchEnabled = false;
					}, this);
				} else {
					RES.getResAsync("1800" + "_png", (texture) => {
						this.img_body.source = texture;
						this.img_body.touchEnabled = false;
					}, this);
				}
			}
		}

		//技能相关
		private closeSkillPanel() {
			this.gp_skill.visible = false;
			this.gp_equip.visible = true;
			RES.getResAsync("equiping_title_png", (texture) => {
				this.commonWin.img_title.texture = texture;
			}, this);
			this.btn_skill.currentState = "up";
			this.updateView(this.curPos);
		}

		//打开详细属性
		private openHeroAttribute() {
			App.GuideManager.setStartGuide(1000);
			// let view = new HeroAttributeView();
			// (EventSystem.getInstance() as EventSystem).dispatchEvent(WinManagerEvent.WIN_ADD, new WinManagerEvent(new WinManagerVO("", "", WinLay.MODULE_LAY), view));
		}

		private checkGuide() {
			//引导装备武器
			App.GuideManager.bindClickBtn(this.equipArray[0], 1000, 2);
			App.GuideManager.bindClickBtn(this.img_close, 1000, 4);
			App.GuideManager.checkGuide(1000);

			//引导装备衣服
			App.GuideManager.bindClickBtn(this.equipArray[1], 1002, 2);
			App.GuideManager.bindClickBtn(this.img_close, 1002, 4);
			App.GuideManager.checkGuide(1002);

			//引导技能升级
			App.GuideManager.bindClickBtn(this.img_close, 1005, 3);
			App.GuideManager.checkGuide(1005);

		}

		private removeGuide() {
			App.GuideManager.removeClickBtn(1000, 2);
			App.GuideManager.removeClickBtn(1000, 4);
			this.skillPanel.removeGuide();
		}
		/**
		 * 打开窗口
		 * @ openParam.type   1:角色  2：技能  4:重生
		 */
		public openWin(openParam: any = null): void {
			super.openWin(openParam);
			// App.Socket.send(15001,{});
			this.hero_head.readyOpen();
			if(openParam && openParam.type) {
				if(openParam.type == 1) {

				} else if(openParam.type == 2 ) {
					this.btn_skill.dispatchEvent(new egret.TouchEvent(egret.TouchEvent.TOUCH_TAP));
				} else if(openParam.type == 4) {
					this.btn_reborn.dispatchEvent(new egret.TouchEvent(egret.TouchEvent.TOUCH_TAP));
				}
			}
			if (!this._handleId) {
				this._handleId = App.EventSystem.addEventListener(PanelNotify.HERO_ON_HERO_SELECT, this.updateView, this);
			}
			if (!this._skillHandleId) {
				this._skillHandleId = App.EventSystem.addEventListener(PanelNotify.HERO_UPDATE_SKILL_PANEL, this.checkRedDot, this);
			}
			App.EventSystem.addEventListener(PanelNotify.HERO_CLOSE_SKILL_PANEL, this.closeSkillPanel, this);
			App.EventSystem.addEventListener(PanelNotify.HERO_ACTIVE_SPECIAL, this.updateSpecialEquipView, this);

			this.checkGuide();

		}

		/**
		 * 关闭窗口
		 */
		public closeWin(callback): void {
			super.closeWin(callback);
		}

		/**
		 * 清理
		 */
		public clear(data: any = null): void {
			super.clear(data);
			this.hero_head.clear();
			if (this._handleId) {
				App.EventSystem.removeEventListener(PanelNotify.HERO_ON_HERO_SELECT, this._handleId);
				this._handleId = undefined;
			}
			if (this._skillHandleId) {
				App.EventSystem.removeEventListener(PanelNotify.HERO_UPDATE_SKILL_PANEL, this._skillHandleId);
				this._skillHandleId = undefined;
			}
			App.EventSystem.removeEventListener(PanelNotify.HERO_CLOSE_SKILL_PANEL);
			App.EventSystem.removeEventListener(PanelNotify.HERO_ACTIVE_SPECIAL);

			this.removeGuide();
		}
		/**
		 * 销毁
		 */
		public destroy(): void {
			super.destroy();
			this._specialArrayEffect.forEach((value, index, array) => {
				value.destroy();
			}, this)
		}
	}
}