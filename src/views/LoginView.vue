<template>
    <div class="LoginView">
        <div class="login-box">
            <img src="../assets/images/login/login-l.png" alt="" class="w-[60%] h-[90%] rounded-l-lg">
            <div class="login-form">
                <p class="title" v-if="!ifRegister">Login</p>
                <p class="title" v-if="ifRegister">Sign Up</p>
                <!-- 下面为用户名输入框 -->
                <p class="text-sm text-left mt-2 -mb-3">用户名</p>
                <el-input v-if="!ifRegister" v-model="username" placeholder="用户名或手机号" class="mt-4">
                    <template #prefix>
                        <el-icon class="el-input__icon">
                            <user />
                        </el-icon>
                    </template>
                </el-input>
                <el-input v-else v-model="username" placeholder="用户名" class="mt-4">
                    <template #prefix>
                        <el-icon class="el-input__icon">
                            <user />
                        </el-icon>
                    </template>
                </el-input>
                <!-- 下面为手机号输入框 -->
                <p class="text-sm text-left mt-2 -mb-3" v-if="ifRegister">手机号</p>
                <el-input v-model="phone" placeholder="手机号" class="mt-4" v-if="ifRegister">

                    <template #prefix>
                        <el-icon><Phone /></el-icon>
                    </template>
                </el-input>
                <!-- 下面为密码输入框 -->
                <p class="text-sm text-left mt-2 -mb-3">密码</p>
                <el-input v-model="password" placeholder="密码" class="mt-4">

                    <template #prefix>
                        <el-icon class="el-input__icon">
                            <Lock />
                        </el-icon>
                    </template>
                </el-input>
                <p class="text-sm text-right text-accent-100 mt-1">忘记密码?</p>
                <div class="Button">
                    <div class="Login" @click="handleLogin" v-if="!ifRegister && !ifresetPassword">
                        <p>登录</p>
                    </div>
                    <div class="Sign" @click="handleSignup" v-if="ifRegister && !ifresetPassword">
                        <p>注册</p>
                    </div>
                    <div class="Login" @click="handleLogin" v-if="ifresetPassword">
                        <p>确定</p>
                    </div>
                </div>


                <div class="signup-message" v-if="!ifRegister" @click="ifRegister = true">
                    <div class="line"></div>
                    <p class="signup">没有账户？
                        <a rel="noopener noreferrer" class="">注册</a>
                    </p>
                    <div class="line"></div>
                </div>
                <div class="signup-message" v-if="ifRegister" @click="ifRegister = false">
                    <div class="line"></div>
                    <p class="signup">已有账户？
                        <a rel="noopener noreferrer" class="">登录</a>
                    </p>
                    <div class="line"></div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { } from "vue"
import { ref } from 'vue';
import { AxiosError } from 'axios';


// 引入ErrorResult接口
import { ErrorResult } from '../interfaces/ErrorResult';


// 引入userInfoStore
import { userInfoStore } from '../stores/UserInfoStore';


import { login, signup } from '../api/user'
import router from '../router/index';

const emit = defineEmits();

//实例化userInfoStore
const userInfo = userInfoStore();


let loginForm = new FormData();
let signupForm = new FormData();


// 定义username
let username = ref('')
// 定义phone
let phone = ref('')
// 定义password
let password = ref('')
//定义ifRegister
let ifRegister = ref(false)
//定义ifresetPassword
let ifresetPassword = ref(false)


// 实现Login方法
const handleLogin = async () => {
    // 清空loginForm
    loginForm = new FormData();

    if (isValidPhone(username.value)) {
        loginForm.append("phone", username.value);
    } else {
        loginForm.append("username", username.value);
    }
    loginForm.append("password", password.value)


    // const data = await login(loginForm).then(response => {
    await login(loginForm).then(response => {
        console.log("登录返回:" + response);



        // 将data转为JsonData
        const JsonData = JSON.stringify(response)
        console.log("Login成功" + JsonData)
        // JsonData封装为对象
        const obj = JSON.parse(JsonData)

        if(obj.userType){
            if(obj.userType != "admin"){
                ElMessage.error('非管理员用户')
                return
            }
        }

        // 将用户信息存储到userInfoStore
        userInfo.setToken(obj.token)
        userInfo.setUser(obj)
        localStorage.setItem('token', obj.token)
        console.log("newTokeninLogin:" + localStorage.getItem('token'))


        toggleVisibility()
        ElMessage.success('管理员登录成功')
        router.push({ path: '/' })
        
    }).catch((error: AxiosError) => {
        // 获取到 AxiosError 中的 error
        // 处理错误的情况
        console.log("错误:" + error);

        // 这里可以根据你的需要，从 error 对象中获取更多信息
        if (error.response) {
            console.log("响应状态码:" + error.response.status);
            console.log("响应数据:" + (error.response.data as ErrorResult).status);
        } else if (error.request) {
            console.log("请求未收到响应");
        } else {
            console.log("发生了错误：" + error.message);
        }
    });
}




const handleSignup = async () => {
    // 清空signupForm
    signupForm = new FormData();

    signupForm.append("avatar", "")
    signupForm.append("username", username.value)
    signupForm.append("password", password.value)
    signupForm.append("phone", phone.value)
    signupForm.append("userType", "admin")

    await signup(signupForm).then(response => {
        console.log("注册返回:" + response);

        // 回到登录状态
        ifRegister.value = false

        ElMessage.success('注册成功,请登录')

    }).catch((error: AxiosError) => {
        // 获取到 AxiosError 中的 error
        // 处理错误的情况
        console.log("错误:" + error);

        // 这里可以根据你的需要，从 error 对象中获取更多信息
        if (error.response) {
            console.log("响应状态码:" + error.response.status);
            console.log("响应数据:" + (error.response.data as ErrorResult).status);
        } else if (error.request) {
            console.log("请求未收到响应");
        } else {
            console.log("发生了错误：" + error.message);
        }
    });

}


const toggleVisibility = () => {
    emit('updateIfShow', false);
};
// 完成检验中国大陆手机号的isValidPhone函数
function isValidPhone(phone: string) {
    return /^1[3-9]\d{9}$/.test(phone);
}

</script>

<style lang="scss" scoped>
.LoginView {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100%;
    min-height: 100vh;
    background-color: #E6F4FF;

    .login-box {
        width: 1000px;
        height: 474.38px;
        border-radius: 8px;
        display: flex;
        justify-content: center;
        align-items: center;

        .login-form {
            width: 320px;
            height: 90%;
            border-radius: 0 0.75rem 0.75rem 0;
            background-color: var(--primary-100);
            padding: 2rem;
            color: black;

            .title {
                text-align: center;
                font-size: 1.5rem;
                line-height: 2rem;
                font-weight: 700;
            }

            .form {
                margin-top: 1.5rem;

                .input-group {
                    margin-top: 0.25rem;
                    font-size: 0.875rem;
                    line-height: 1.25rem;
                    text-align: left;

                    label {
                        display: block;
                        color: var(--text-100);
                        margin-bottom: 4px;
                    }

                    input {
                        width: 100%;
                        border-radius: 0.375rem;
                        border: 1px solid var(--bg-300);
                        outline: 0;
                        background-color: var(--bg-100);
                        padding: 0.75rem 1rem;
                        color: rgba(243, 244, 246, 1);
                    }

                    input:focus {
                        border-color: var(--accent-100);
                    }

                    .forgot {
                        display: flex;
                        justify-content: flex-end;
                        font-size: 0.75rem;
                        line-height: 1rem;
                        color: rgba(156, 163, 175, 1);
                        margin: 8px 0 14px 0;
                    }


                }

                .sign {
                    display: block;
                    width: 100%;
                    background-color: var(--accent-100);
                    padding: 0.75rem;
                    text-align: center;
                    color: var(--text-100);
                    border: none;
                    border-radius: 0.375rem;
                    font-weight: 600;
                }



            }

            .signup-message {
                display: flex;
                align-items: center;
                padding-top: 1rem;
                margin-top: 10px;

                .line {
                    height: 1px;
                    flex: 1 1 0%;
                    background-color: rgba(55, 65, 81, 1);
                }

                .signup {
                    text-align: center;
                    font-size: 0.75rem;
                    line-height: 1rem;
                    color: var(--text-100);

                }
            }
        }


        .forgot a,
        .signup a {
            color: var(--accent-100);
            text-decoration: none;
            font-size: 14px;
        }

        .forgot a:hover,
        .signup a:hover {
            text-decoration: underline rgba(167, 139, 250, 1);
        }

    }

}

.el-input {
    height: 45px;
    background-color: #FFFFFF;


    border: 0.5px solid var(--text-200);
    border-radius: 12px;

    font-size: 18px;

    border: 0px;
    font-weight: bold;

    :deep(.el-input__wrapper) {
        border-radius: 12px;


    }

    :deep(.is-focus) {

        box-shadow: 0 0 0 1px var(--accent-200)
    }


    .Input {
        display: flex;
        justify-content: flex-start;
        align-items: center;
        flex: 1;


        height: 50px;

        background-color: #FFFFFF;

        border-radius: 12px;
        border: 0.5px solid var(--text-200);

        input {
            outline: none;
            padding-left: 10px;
            font-size: 18px;
            width: 200px;
            border: 0px;
            font-weight: bold;
        }
    }


}

.Button {
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 20px;

    .Login {
        display: flex;
        justify-content: center;
        align-items: center;
        flex: 1;


        height: 50px;

        background-color: var(--accent-100);
        color: var(--text-200);

        border-radius: 12px;
        // border: 0.5px solid var(--text-200);
        font-weight: bold;


        padding: 12px;
        margin-top: 10px;

    }

    .Sign {
        display: flex;
        justify-content: center;
        align-items: center;
        flex: 1;


        height: 50px;

        background-color: var(--accent-100);
        color: var(--text-200);

        border-radius: 12px;
        // border: 0.5px solid var(--text-200);
        font-weight: bold;


        padding: 12px;

    }
}
</style>
