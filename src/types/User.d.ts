declare namespace User {
    // 定义用户信息的数据类型
    interface UserInfo {
        userId?:string // 用户id
        userName?: string, // 用户名
        phone?: string, // 用户手机号码
        avatar?: string, // 用户头像链接地址
        indentity?: number // 用户身份信息
    }
}