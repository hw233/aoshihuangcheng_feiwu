/**
 * Author: zhangshunqiu
 * Email： 21102585@qq.com
 * 场景全局常量 2017/06/20
 */
//场景事件
var SceneEventType = {
    INIT_SCENE: "init_scenef",
    SCENE_INIT_COMPLETE: "init_sceneCompletef",
    SCENE_OBJECT_MOVE: "SCENE_OBJECT_MOVE",
    HOOK_SKILL_TRIGGER: "HOOK_SKILL_TRIGGER",
    HOOK_SPECIAL_SKILL_TRIGGER: "HOOK_SPECIAL_SKILL_TRIGGER",
    SKILL_TRIGGER: "SKILL_TRIGGER",
    SHOW_SKILL_RANG_GRIDS: "SHOW_SKILL_RANG_GRIDS",
    UPDATE_OBJ_MODEL: "UPDATE_OBJ_MODEL",
    UPDATE_HP: "UPDATE_HP",
    SHOW_BODY_EFF: "SHOW_BODY_EFdF",
    SHOW_FLY_EFF: "SCENE_ADD_FLY_EFF",
    SHOW_GROUP_EFF: "SCENE_ADD_GROUP_EFF",
    PLAY_COLLISION: "PLAY_COLLISION",
    ADD_SCENE_OBJECT: "ADD_SCENE_OBJECT",
    REMOVE_SCENE_OBJECT: "REMOVE_SCENE_OBJECT",
    UPDATE_SCENE_POS: "UPDATE_SCENE_POS",
    UPDATE_HONOR_TITLE: "UPDATE_HONOR_TITLE",
    BOSS_INFO: "BOSS_INFO",
};
//场景地图类型
var SCENE_MAP_TYPE = {
    HOOK: 1,
    HOOK_BOSS: 2,
    BOOS_COPY: 3,
    MATERICAL_COPY: 4,
    CHALLENGE_COPY: 5,
    WORLD_BOSS: 6,
    ARENA: 9,
};
//场景对象类型
var SceneObjectType = {
    PLAYER: 1,
    MONSTER: 2,
    ITEM: 3,
    PET: 4,
    NPC: 5,
    PLAYERCOPY: 6,
    PARTNER: 9,
    COLLECT: 7,
    SKILLEFF: 8,
};
//拾取场景物品类型
var PICK_ITEM_TYPE = {
    get_by_move: 1,
    get_by_fly: 2,
};
//场景对象动作状态
var ActState = {
    STAND: 1,
    RUN: 2,
    ATTACK: 3,
    HITED: 4,
    DEAD: 5,
    COLLECT: 6,
};
//战斗PK模式类型0打怪模式 1 和平，2 全体，3 帮派，4 队伍，5 善恶 6新手，7仇人，8联盟
var PKModeType = {
    NONE: 0,
    PEACE: 1,
    ALL: 2,
    GUILD: 3,
    TEAM: 4,
    GOODEVIL: 5,
    NEWPLAYER: 6,
    ENEMY: 7,
    UNION: 8,
};
//攻击目标类型
var SkillTargetType = {
    SELF: 1,
    PARTNER: 2,
    ENEMY: 3,
    EMPTY: 4,
};
/**
 * 技能攻击动作类型
 */
var SkillATKActType = {
    PHYSICS: 3,
    MAGIC: 4,
};
/**
 * 技能攻击效果类型
 */
var SkillATKEffType = {
    ONE: 1,
    EIGHT: 2,
};
/**
 * 主场景ID
 */
var MAIN_CITY_SCENE_ID = 10000;
var SCENE_AREAN_ID = 30001;
/**
 * 野蛮冲撞技能ID
 */
var SKILL_YMCZ_ID = 10300;
/**
 * 抗拒火环技能ID
 */
var SKILL_KJHH_ID = 20400;
/**
 * 召唤术技能ID
 */
var SKILL_ZHS_ID = 30500;
/**
 * 魔法盾技能ID
 */
var SKILL_MFD_ID = 20300;
/**
 * 技能伤害效果类型
 */
var SkillHurtEffType = {
    BODY_MIDDLE: 1,
    BODY_MULTI_MIDDLE: 2,
    BODY_SURFACE: 3,
    GROUP_SKY: 4,
    GROUP_SURFACE: 5,
    GROUP_FIRE: 6,
};
//技能攻击范围类型
//:1.单人（一个目标，单人不用到格子搜索）2.近身群体（以自己位置为起点）3.远程群体（以目标位置为起点）
var SkillAtkRangeType = {
    R_SINGLE: 1,
    /**近身群体 */
    R_N_GROUP: 2,
    /**远程群体 */
    R_F_GROUP: 3,
};
/**
 * 怪物攻击类型
* 1;//攻击类型：1:主动攻击,2=被动攻击,3=不主动攻击不反击
*/
var MonsterAtkType = {
    AUTO: 1,
    PASSIVE: 2,
    AVOID: 3,
};
/**
 * 怪物类型
*/
var MONSTER_TYPE = {
    ORDINARY: 1,
    LEVEL_BOSS: 2,
    GENERAL_BOSS: 3,
    WORLD_BOSS: 4,
};
var SkillAtkRange = {
    range1: [[[0, 0]]],
    range2: [[[0, 0], [0, -1], [0, 1], [-1, 0], [1, 0], [1, -1], [-1, -1], [-1, 1], [1, 1]]],
    range8: [[[0, 0], [0, -1], [0, 1], [-1, 0], [1, 0], [1, -1], [-1, -1], [-1, 1], [1, 1], [0, -2], [0, 2], [-2, 0], [2.0], [-1, -2], [2, -1], [1, 2], [-2, 1], [1, -2], [2, 1], [-1, 2], [-2, -1]]],
    range3: [
        [],
        [[0, 0], [0, -1], [-1, 0], [1, 0], [-1, -1], [1, -1], [0, -2], [-1, -2], [1, -2], [-2, -1], [2, -1], [-2, 0], [2, 0]],
        [[0, 0], [1, -1], [1, 0], [0, -1], [1, 1], [-1, -1], [2, 0], [0, -2], [1, -2], [2, -1], [2, 1], [-1, -2], [2, -2]],
        [[0, 0], [1, 0], [1, 1], [1, -1], [0, -1], [0, 1], [2, 0], [2, 1], [2, -1], [1, -2], [1, 2], [0, -2], [0, 2]],
        [[0, 0], [1, 1], [1, 0], [0, 1], [-1, 1], [1, -1], [2, 1], [1, 2], [2, 0], [0, 2], [2, -1], [-1, 2], [2, 2]],
        [[0, 0], [0, 1], [1, 1], [-1, 1], [1, 0], [-1, 0], [0, 2], [-1, 2], [1, 2], [-2, 1], [2, 1], [-2, 0], [2, 0]],
        [[0, 0], [-1, 1], [-1, 0], [0, 1], [1, 1], [-1, -1], [-1, 2], [-2, 1], [0, 2], [-2, 0], [-2, 2], [-2, -1], [1, 2]],
        [[0, 0], [-1, 0], [-1, -1], [-1, 1], [0, 1], [0, -1], [-2, 0], [-2, -1], [-2, 1], [-1, 2], [-1, -2], [0, 2], [0, -2]],
        [[0, 0], [-1, -1], [-1, 0], [0, -1], [1, -1], [-1, 1], [-2, -1], [-1, -2], [-2, 0], [0, -2], [-2, 1], [1, -2], [-2, -2]]
    ],
    range4: [
        [],
        [[0, -1], [0, -2]],
        [[1, -1], [2, -2]],
        [[1, 0], [2, 0]],
        [[1, 1], [2, 2]],
        [[0, 1], [0, 2]],
        [[-1, 1], [-2, 2]],
        [[-1, 0], [-2, 0]],
        [[-1, -1], [-2, -2]]
    ],
    range5: [
        [],
        [[0, -1], [0, -2], [0, -3], [-1, -2], [1, -2]],
        [[1, -1], [2, -2], [1, -2], [2, -1]],
        [[1, 0], [2, 0], [3, 0], [2, -1], [2, 1]],
        [[1, 1], [2, 2], [2, 1], [1, 2]],
        [[0, 1], [0, 2], [0, 3], [-1, 2], [1, 2]],
        [[-1, 1], [-2, 2], [-2, 1], [-1, 2]],
        [[-1, 0], [-2, 0], [-3, 0], [-2, -1], [-2, 1]],
        [[-1, -1], [-2, -2], [-1, -2], [-2, -1]]
    ],
    range6: [
        [],
        [[0, -1], [0, -2], [0, -3], [0, -4], [-1, -2], [1, -2], [-1, -3], [1, -3]],
        [[1, -1], [2, -2], [3, -3], [1, -2], [2, -1], [2, -3], [3, -2]],
        [[1, 0], [2, 0], [3, 0], [4, 0], [2, -1], [2, 1], [3, -1], [3, 1]],
        [[1, 1], [2, 2], [3, 3], [2, 1], [1, 2], [3, 2], [2, 3]],
        [[0, 1], [0, 2], [0, 3], [0, 4], [-1, 2], [1, 2], [-1, 3], [1, 3]],
        [[-1, 1], [-2, 2], [-3, 3], [-2, 1], [-1, 2], [-3, 2], [-2, 3]],
        [[-1, 0], [-2, 0], [-3, 0], [-4, 0], [-2, -1], [-2, 1], [-3, -1], [-3, 1]],
        [[-1, -1], [-2, -2], [-3, -3], [-1, -2], [-2, -1], [-2, -3], [-3, -2]]
    ],
    range7: [
        [],
        [[0, -1], [0, -2], [0, -3], [0, -4], [0, -5], [-1, -2], [1, -2], [-1, -3], [1, -3], [-1, -4], [1, -4]],
        [[1, -1], [2, -2], [3, -3], [4, -4], [1, -2], [2, -1], [2, -3], [3, -2], [3, -4], [4, -3]],
        [[1, 0], [2, 0], [3, 0], [4, 0], [5, 0], [2, -1], [2, 1], [3, -1], [3, 1], [4, -1], [4, 1]],
        [[1, 1], [2, 2], [3, 3], [4, 4], [2, 1], [1, 2], [3, 2], [2, 3], [4, 3], [3, 4]],
        [[0, 1], [0, 2], [0, 3], [0, 4], [0, 5], [-1, 2], [1, 2], [-1, 3], [1, 3], [-1, 4], [1, 4]],
        [[-1, 1], [-2, 2], [-3, 3], [-4, 4], [-2, 1], [-1, 2], [-3, 2], [-2, 3], [-4, 3], [-3, 4]],
        [[-1, 0], [-2, 0], [-3, 0], [-4, 0], [-5, 0], [-2, -1], [-2, 1], [-3, -1], [-3, 1], [-4, -1], [-4, 1]],
        [[-1, -1], [-2, -2], [-3, -3], [-4, -4], [-1, -2], [-2, -1], [-2, -3], [-3, -2], [-3, -4], [-4, -3]]
    ],
    range11: [[[0, -1], [0, 1], [-1, 0], [1, 0], [1, -1], [-1, -1], [-1, 1], [1, 1]]],
    range22: [[[0, -1], [0, 1], [-1, 0], [1, 0], [1, -1], [-1, -1], [-1, 1], [1, 1], [0, -2], [0, 2], [-2, 0], [2.0], [-1, -2], [2, -1], [1, 2], [-2, 1], [1, -2], [2, 1], [-1, 2], [-2, -1]]],
    range23: [[[0, -1], [0, 1], [-1, 0], [1, 0], [1, -1], [-1, -1], [-1, 1], [1, 1], [0, -2], [0, 2], [-2, 0], [2.0], [-1, -2], [2, -1], [1, 2], [-2, 1], [1, -2], [2, 1], [-1, 2], [-2, -1]]],
};
//野蛮冲撞正面格子路径
var BumpFrontGrids = [
    [],
    [
        [],
        [[0, -1], [0, -2]],
        [[1, -1]],
        [[1, 0], [2, 0]],
        [[1, 1]],
        [[0, 1], [0, 2]],
        [[-1, 1]],
        [[-1, 0], [-2, 0]],
        [[-1, -1]]
    ],
    [
        [],
        [[0, -1], [0, -2], [0, -3]],
        [[1, -1], [2, -2]],
        [[1, 0], [2, 0], [3, 0]],
        [[1, 1], [2, 2]],
        [[0, 1], [0, 2], [0, 3]],
        [[-1, 1], [-2, 2], [-3, 3]],
        [[-1, 0], [-2, 0], [-3, 0]],
        [[-1, -1], [-2, -2]]
    ],
    [
        [],
        [[0, -1], [0, -2], [0, -3], [0, -4]],
        [[1, -1], [2, -2], [3, -3]],
        [[1, 0], [2, 0], [3, 0], [4, 0]],
        [[1, 1], [2, 2], [3, 3]],
        [[0, 1], [0, 2], [0, 3], [0, 4]],
        [[-1, 1], [-2, 2], [-3, 3]],
        [[-1, 0], [-2, 0], [-3, 0], [-4, 0]],
        [[-1, -1], [-2, -2], [-3, -3]]
    ]
];
//野蛮冲撞反面格子路径
var BumpBackGrids = [
    [],
    [[0, 1], [0, 2], [0, 3], [0, 4]],
    [[-1, 1], [-2, 2], [-3, 3]],
    [[-1, 0], [-2, 0], [-3, 0], [-4, 0]],
    [[-1, -1], [-2, -2], [-3, -3]],
    [[0, -1], [0, -2], [0, -3], [0, -4]],
    [[1, -1], [2, -2], [3, -3]],
    [[1, 0], [2, 0], [3, 0], [4, 0]],
    [[1, 1], [2, 2], [3, 3]],
];
//火墙格子
var FireWallGrids = [[0, 0], [0, -1], [0, 1], [-1, 0], [1, 0], [1, -1], [-1, -1], [-1, 1], [1, 1]];
// //当前方向前面8个格子格子坐标偏移量
// const FrontGridsByDire = [
// 	[],
// 	[[0,-1],[0,-2],[0,-3],[0,-4]],
// 	[[1,-1],[2,-2],[3,-3],[4,-4]],
// 	[[1,0],[2,0],[3,0],[4,0]],
// 	[[1,1],[2,2],[3,3],[4,4]],
// 	[[0,1],[0,2],[0,3],[0,4]],
// 	[[-1,1],[-2,2],[-3,3],[-4,4]],
// 	[[-1,0],[-2,0],[-3,0],[-4,0]],
// 	[[-1,-1],[-2,-2],[-3,-3],[-4,-4]]
// ];
//八方向格子偏移量1
var EightDireGridOffSet1 = [[0, 0], [0, -1], [1, -1], [1, 0], [1, 1], [0, 1], [-1, 1], [-1, 0], [-1, -1]];
//八方向格子偏移量2
var EightDireGridOffSet2 = [[0, 2], [0, -2], [-2, 0], [2, 0], [1, -2], [2, 1], [-1, 2], [-2, -1], [-1, -2], [2, -1], [1, 2], [-2, 1]];
//八方向格子偏移量3 3个的没有搜2个的
var EightDireGridOffSet3 = [[0, 3], [0, -3], [-3, 0], [3, 0], [2, -2], [2, 2], [-2, 2], [-2, -2]];
//八方向格子偏移量4 4个的没有搜3个的
var EightDireGridOffSet4 = [[0, 4], [0, -4], [-4, 0], [4, 0], [3, -3], [3, 3], [-3, 3], [-3, -3]];
//物品掉落螺旋格子，从中心点开始
var DROP_ITEM_GRID_LIST = [[0, 0], [0, -1], [1, -1], [1, 0], [1, 1], [0, 1], [-1, 1], [-1, 0], [-1, -1], [0, 2], [0, -2], [-2, 0], [2, 0], [1, -2], [2, 1], [-1, 2], [-2, -1], [-1, -2], [2, -1], [1, 2], [-2, 1], [0, 3], [1, 3], [2, 3], [3, 3], [3, 2], [3, 1], [3, 0], [3, -1], [3, -2], [3, -3], [2, -3], [1, -3], [0, -3], [-1, -3], [-2, -3], [-3, -3], [-3, -2], [-3, -1], [-3, 0], [-3, 1], [-3, 2], [-3, 3], [-2, 3], [-1, 3]];
/**
 * 自动技能配置信息
 */
var AutoSkillConfig = [
    [50000],
    [10200, 10100, 10300, 10400, 10500],
    [20100, 20200, 20300, 20400, 20500],
    [30100, 30200, 30300, 30500, 30400]
];
/**
 * 八方向1方向和缩放值常量
 */
var DireScaleType1 = new DireScale(1, 1, 1);
/**
 * 八方向2方向和缩放值常量
 */
var DireScaleType2 = new DireScale(2, 1, 2);
/**
 * 八方向3方向和缩放值常量
 */
var DireScaleType3 = new DireScale(3, 1, 3);
/**
 * 八方向4方向和缩放值常量
 */
var DireScaleType4 = new DireScale(4, 1, 4);
/**
 * 八方向5方向和缩放值常量
 */
var DireScaleType5 = new DireScale(5, 1, 5);
/**
 * 八方向6方向和缩放值常量
 */
var DireScaleType6 = new DireScale(4, -1, 6);
/**
 * 八方向7方向和缩放值常量
 */
var DireScaleType7 = new DireScale(3, -1, 7);
/**
 * 八方向8方向和缩放值常量
 */
var DireScaleType8 = new DireScale(2, -1, 8);
/*
* 八方向和缩放值常量
*/
var DireScaleType = [
    DireScaleType5,
    DireScaleType1,
    DireScaleType2,
    DireScaleType3,
    DireScaleType4,
    DireScaleType5,
    DireScaleType6,
    DireScaleType7,
    DireScaleType8,
];
/*
* 八方向反方向值常量
*/
var DireScaleReverseType = [
    DireScaleType5,
    DireScaleType5,
    DireScaleType6,
    DireScaleType7,
    DireScaleType8,
    DireScaleType1,
    DireScaleType2,
    DireScaleType3,
    DireScaleType4,
];
//方向角度值(弧度)
var DireAngle1 = 90 * Math.PI / 180;
//方向角度值(弧度)
var DireAngle2 = 135 * Math.PI / 180;
//方向角度值(弧度)
var DireAngle3 = 180 * Math.PI / 180;
//方向角度值(弧度)
var DireAngle4 = -135 * Math.PI / 180;
//方向角度值(弧度)
var DireAngle5 = -90 * Math.PI / 180;
//方向角度值(弧度)
var DireAngle6 = -45 * Math.PI / 180;
//方向角度值(弧度)
var DireAngle7 = 0 * Math.PI / 180;
//方向角度值(弧度)
var DireAngle8 = 45 * Math.PI / 180;
/*
* 八方向角度值常量
*/
var DireAngleType = [
    0,
    DireAngle1,
    DireAngle2,
    DireAngle3,
    DireAngle4,
    DireAngle5,
    DireAngle6,
    DireAngle7,
    DireAngle8,
];
/**
 * 场景滤镜类型
 */
var SceneFiltersType = {
    NULL: 0,
    GRAY: 1,
    RED: 2,
    BLUE: 3,
    GREEN: 4,
    WHITE: 5,
};
/**
 * 滤镜
 */
var SceneFilters = [
    [],
    [new egret.ColorMatrixFilter([0.3, 0.6, 0, 0, 0, 0.3, 0.6, 0, 0, 0, 0.3, 0.6, 0, 0, 0, 0, 0, 0, 1, 0])],
    [new egret.ColorMatrixFilter([1, 0, 0, 0, 200, 0, 1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1, 0])],
    [new egret.ColorMatrixFilter([1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1, 0, 200, 0, 0, 0, 1, 0])],
    [new egret.ColorMatrixFilter([1, 0, 0, 0, 0, 0, 1, 0, 0, 200, 0, 0, 1, 0, 0, 0, 0, 0, 1, 0])],
    [new egret.ColorMatrixFilter([1, 0, 0, 0, 200, 0, 1, 0, 0, 200, 0, 0, 1, 0, 200, 0, 0, 0, 1, 0])],
];
/**
 * buff 效果类型
 */
var BuffEffType = {
    NULL: 0,
    /**减伤 */
    REDUCE_HURT: 1,
    ATTADD: 2,
    /**烈火 */
    FIRE: 3,
    /**眩晕 */
    DIZZY: 4,
    /** 中毒*/
    POISON: 5,
    /**吸血 */
    SUCkBLOOD: 6,
    /**麻痹 */
    PARALYSIS: 7,
    CURE: 8,
    ADDEXP: 9,
    /**沉默 */
    SILENT: 10,
    /**隐身 */
    INVISIBLE: 11,
    /**石化 */
    STONE: 12,
    /**魔法盾 */
    SHIELD: 13,
};
//# sourceMappingURL=SceneConst.js.map