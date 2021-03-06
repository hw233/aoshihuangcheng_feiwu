/**
 * 排行榜第一名UI视图层	
 * author : 杨艺鹏
*/
module game {
	export class RankTopView extends eui.ItemRenderer{
		
		private bitmap_vip:eui.BitmapLabel;
		private img_pic:eui.Image;
		private lb_level:eui.Label;
		private lb_rankData:eui.Label;
		private lb_name:eui.Label;
		private img_rankNum:eui.Image;
		private img_yue:eui.Image;
		private img_vip:eui.Image;
		private img_honor:eui.Image;
		private rankListItem:RankListItem;
		private img_body:eui.Image;
		private img_wing:eui.Image;
		private img_weapon:eui.Image;

		private _rankType:string;
		public constructor() {
			super();
			this.skinName = RankTopSkin;
			// App.EventSystem.addEventListener("rankk",this.setRankType,this)
		}

		protected dataChanged():void
		{	
			//排名图片
			// this.img_rankNum.source = "ranking list_1_png";
			//显示人物
			this.showHero();
			//称号（绝世杀神、。。。。）
			this.setHonor();

			this.rankListItem.updateUi(this.data);
			this.rankListItem.setFirstStyle();
		}

		private showHero():void
		{	
			var rankView:RankView = WinManager.getInstance().getWin(WinName.RANK) as RankView;
			var rankType:string = rankView.curRankType;
			var heroMsg:Array<any> = (RankModel.getInstance() as RankModel).rankObj[rankType]["model"];
	
			if(heroMsg[0])
			{
				RES.getResAsync(heroMsg[0] + "_png", (texture) => {
					this.img_weapon.source = texture;
					this.img_weapon.touchEnabled = false;
				}, this);
			}
			if(heroMsg[1])
			{
				RES.getResAsync(heroMsg[0] + "_png", (texture) => {
					this.img_body.source = texture;
					this.img_body.touchEnabled = false;
				}, this);
			}
			if(heroMsg[2])
			{
				RES.getResAsync(heroMsg[0] + "_png", (texture) => {
					this.img_wing.source = texture;
					this.img_wing.touchEnabled = false;
				}, this);
			}
		}

		private setHonor():void
		{	
			var rankView:RankView = WinManager.getInstance().getWin(WinName.RANK) as RankView;
			var rankType:string = rankView.curRankType;
			// var rankType:string = (RankModel.getInstance() as RankModel).curViewRankType;
			switch(rankType)
			{
				case ConstRankName.COMBAT:
						this.img_honor.source = "ranking list_tianxaidiyi_png";
						break;
				case ConstRankName.LEVEL:
						this.img_honor.source = "";
						break;
				case ConstRankName.FIGHTER:
						this.img_honor.source = "";
						break;
				case ConstRankName.MAGIC:
						this.img_honor.source = "";
						break;
				case ConstRankName.TAOIST:
						this.img_honor.source = "";
						break;
				case ConstRankName.KILL:
						this.img_honor.source = "ranking list_dangshishashen_png";
						break;
				case ConstRankName.MEMAL:
						this.img_honor.source = "";
						break;
					case ConstRankName.KING:
						// switch(this.data.grade)
						// {
						// 	case 0:
						// 		this.img_pic.source = "labber_huizhang_qingtong_png";
						// 		break;
						// 	case 1:
						// 		this.img_pic.source = "labber_huizhang_huangjin_png";
						// 		break;
						// 	case 2:
						// 		this.img_pic.source = "labber_huizhang_baiyin_png";
						// 		break;
						// 	case 3:
						// 		this.img_pic.source = "labber_huizhang_zuanshi_png";
						// 		break;							
						// }
						break;
				default:
						break;
			}
		}
	}
}