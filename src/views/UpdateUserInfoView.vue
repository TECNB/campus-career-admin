<template>
    <div class="h-full">
        <div class="flex justify-center items-center px-8">
            <div class="h-full flex justify-center items-center gap-5">
                <p class="md:text-4xl font-extrabold text-2xl" v-if="userInfo.user?.userType == 'student'">个人信息登记详情</p>
                <p class="md:text-4xl font-extrabold text-2xl text-center" v-if="userInfo.user?.userType == 'teacher'">
                    {{ userDetail.name }}学生信息表</p>
                <div class="bg-blue-400 w-fit cursor-pointer rounded-md px-2 py-1"
                    v-if="userInfo.user?.userType == 'teacher'">
                    <p class="font-bold text-white" @click="handleExportToPDF">导出打印</p>
                </div>
            </div>
        </div>
        <el-scrollbar height="90%">
            <div class="flex flex-col justify-center gap-2 p-10" id="printArea">
                <div class="flex justify-between items-center">
                    <div class="flex flex-col justify-center gap-2">
                        <!-- 第一行 -->
                        <div class="flex flex-1 justify-between items-center gap-52">
                            <div class="flex flex-1 justify-start items-center">
                                <p class="text-xl font-bold whitespace-nowrap">姓名：</p>
                                <p class="text-xl font-bold whitespace-nowrap">{{ userDetail.name }}</p>
                            </div>
                            <div class="flex flex-1 justify-start items-center">
                                <p class="text-xl font-bold whitespace-nowrap">学号：</p>
                                <p class="text-xl font-bold whitespace-nowrap">{{ userDetail.studentId }}</p>
                            </div>

                            <div class="flex flex-1 justify-start items-center mt-4 md:mt-0">
                                <p class="text-xl font-bold whitespace-nowrap">专业：</p>
                                <p class="text-xl font-bold whitespace-nowrap">{{ userDetail.major }}</p>
                            </div>
                        </div>

                        <!-- 第二行 -->
                        <div class="md:flex md:flex-1 justify-between items-center gap-10">
                            <div class="flex flex-1 justify-start items-center">
                                <p class="text-xl font-bold whitespace-nowrap">性别：</p>
                                <p class="text-xl font-bold whitespace-nowrap">{{ userDetail.gender }}</p>
                            </div>
                            <div class="flex flex-1 justify-start items-center">
                                <p class="text-xl font-bold whitespace-nowrap">手机号：</p>
                                <p class="text-xl font-bold whitespace-nowrap">{{ userDetail.phone }}</p>
                            </div>
                            <div class="flex flex-1 justify-start items-center">
                                <p class="text-xl font-bold whitespace-nowrap">专业方向：</p>
                                <p class="text-xl font-bold whitespace-nowrap">{{ userDetail.specialization }}</p>
                            </div>

                        </div>

                        <!-- 第三行 -->
                        <div class="md:flex md:flex-1 justify-between items-center gap-10">
                            <div class="flex flex-1 justify-start items-center">
                                <p class="text-xl font-bold whitespace-nowrap">班级：</p>
                                <p class="text-xl font-bold whitespace-nowrap">{{ userDetail.className }}</p>
                            </div>
                            <div class="flex flex-1 justify-start items-center">
                                <p class="text-xl font-bold whitespace-nowrap">班级职务：</p>
                                <p class="text-xl font-bold whitespace-nowrap">{{ userDetail.classRole }}</p>
                            </div>
                            <div class="flex flex-1 justify-start items-center">
                                <p class="text-xl font-bold whitespace-nowrap">出生日期：</p>
                                <p class="text-xl font-bold whitespace-nowrap">{{ userDetail.birthDate }}</p>
                            </div>

                        </div>
                        <!-- 第四行 -->
                        <div class="md:flex md:flex-1 justify-between items-center gap-10">
                            <div class="flex flex-1 justify-start items-center">
                                <p class="text-xl font-bold whitespace-nowrap">民族：</p>
                                <p class="text-xl font-bold whitespace-nowrap">{{ userDetail.ethnicity }}</p>
                            </div>
                            <div class="flex flex-1 justify-start items-center">
                                <p class="text-xl font-bold whitespace-nowrap">籍贯：</p>
                                <p class="text-xl font-bold whitespace-nowrap">{{ userDetail.nativePlace }}</p>
                            </div>
                            <div class="flex flex-1 justify-start items-center">
                                <p class="text-xl font-bold whitespace-nowrap">生源地：</p>
                                <p class="text-xl font-bold whitespace-nowrap">{{ userDetail.sourcePlace }}</p>
                            </div>
                        </div>
                        <!-- 第五行 -->
                        <div class="md:flex md:flex-1 justify-between items-center gap-10">
                            <div class="flex flex-1 justify-start items-center mt-4 md:mt-0">
                                <p class="text-xl font-bold whitespace-nowrap">身份证号：</p>
                                <p class="text-xl font-bold whitespace-nowrap">{{ userDetail.idCard }}</p>
                            </div>
                            <div class="flex flex-1 justify-start items-center mt-4 md:mt-0">
                            </div>
                            <div class="flex flex-1 justify-start items-center">
                                <p class="text-xl font-bold whitespace-nowrap">年级：</p>
                                <p class="text-xl font-bold whitespace-nowrap">{{ userDetail.grade }}</p>
                            </div>
                        </div>
                    </div>
                    <div class="w-32 h-44 flex flex-col justify-center">
                        <div class="flex flex-1 justify-center items-center">
                            <img :src="userDetail.imageUrl" class="avatar" />
                        </div>
                    </div>
                </div>




                <!-- 第六行 -->
                <div class="md:flex md:flex-1 justify-between items-center gap-10">
                    <div class="flex flex-1 justify-start items-center">
                        <p class="text-xl font-bold whitespace-nowrap">户口所在地：</p>
                        <p class="text-xl font-bold whitespace-nowrap">{{ userDetail.residence }}</p>
                    </div>
                </div>
                <!-- 第七行 -->
                <div class="md:flex md:flex-1 justify-between items-center gap-10">
                    <div class="flex flex-1 justify-start items-center">
                        <p class="text-xl font-bold whitespace-nowrap">家庭住址：</p>
                        <p class="text-xl font-bold whitespace-nowrap">{{ userDetail.homeAddress }}</p>
                    </div>
                </div>
                <!-- 第八行 -->
                <div class="md:flex md:flex-1 justify-between items-center gap-10">
                    <div class="flex flex-1 justify-start items-center">
                        <p class="text-xl font-bold whitespace-nowrap">入学日期：</p>
                        <p class="text-xl font-bold whitespace-nowrap">{{ userDetail.admissionDate }}</p>
                    </div>
                    <div class="flex flex-1 justify-start items-center">
                        <p class="text-xl font-bold whitespace-nowrap">预计毕业时间：</p>
                        <p class="text-xl font-bold whitespace-nowrap">{{ userDetail.expectedGraduation }}</p>
                    </div>
                </div>


                <!-- 第九行 -->
                <div class="md:flex md:flex-1 justify-between items-center gap-10">
                    <div class="flex flex-1 justify-start items-center">
                        <p class="text-xl font-bold whitespace-nowrap">辅导员：</p>
                        <p class="text-xl font-bold whitespace-nowrap">{{ userDetail.counselor }}</p>
                    </div>
                    <div class="flex flex-1 justify-start items-center">
                        <p class="text-xl font-bold whitespace-nowrap">辅导员手机号：</p>
                        <p class="text-xl font-bold whitespace-nowrap">{{ userDetail.counselorPhone }}</p>
                    </div>
                    <div class="flex flex-1 justify-start items-center">
                        <p class="text-xl font-bold whitespace-nowrap">寝室号：</p>
                        <p class="text-xl font-bold whitespace-nowrap">{{ userDetail.dormitoryNumber }}</p>
                    </div>
                </div>

                <!-- 第十行 -->
                <div class="md:flex md:flex-1 justify-between items-center gap-10">
                    <div class="flex flex-1 justify-start items-center">
                        <p class="text-xl font-bold whitespace-nowrap">班主任：</p>
                        <p class="text-xl font-bold whitespace-nowrap">{{ userDetail.classTeacher }}</p>
                    </div>
                    <div class="flex flex-1 justify-start items-center">
                        <p class="text-xl font-bold whitespace-nowrap">班主任手机号：</p>
                        <p class="text-xl font-bold whitespace-nowrap">{{ userDetail.classTeacherPhone }}</p>
                    </div>
                    <div class="flex flex-1 justify-start items-center">
                        <p class="text-xl font-bold whitespace-nowrap">寝室成员名单：</p>
                        <p class="text-xl font-bold whitespace-nowrap">{{ userDetail.dormitoryMembers }}</p>
                    </div>
                </div>

                <!-- 第十一行 -->
                <div class="md:flex md:flex-1 justify-between items-center gap-10">
                    <div class="flex flex-1 justify-start items-center">
                        <p class="text-xl font-bold whitespace-nowrap">毕设导师：</p>
                        <p class="text-xl font-bold whitespace-nowrap">{{ userDetail.graduationTutor }}</p>
                    </div>
                    <div class="flex flex-1 justify-start items-center">
                        <p class="text-xl font-bold whitespace-nowrap">毕设导师手机号：</p>
                        <p class="text-xl font-bold whitespace-nowrap">{{ userDetail.graduationTutorPhone }}</p>
                    </div>
                    <div class="flex flex-1 justify-start items-center">
                        <p class="text-xl font-bold whitespace-nowrap">红旗网络：</p>
                        <p class="text-xl font-bold whitespace-nowrap">{{ userDetail.networkStatus }}</p>
                    </div>
                </div>

                <!-- 第十二行 -->
                <div class="md:flex md:flex-1 justify-between items-center gap-10">
                    <div class="flex flex-1 justify-start items-center">
                        <p class="text-xl font-bold whitespace-nowrap">政治面貌：</p>
                        <p class="text-xl font-bold whitespace-nowrap">{{ userDetail.politicalStatus }}</p>
                    </div>
                    <div class="flex flex-1 justify-start items-center">
                        <p class="text-xl font-bold whitespace-nowrap">电子邮箱：</p>
                        <p class="text-xl font-bold whitespace-nowrap">{{ userDetail.email }}</p>
                    </div>
                    <div class="flex flex-1 justify-start items-center">
                        <p class="text-xl font-bold whitespace-nowrap">QQ号码：</p>
                        <p class="text-xl font-bold whitespace-nowrap">{{ userDetail.qqNumber }}</p>
                    </div>
                </div>


                <!-- 第十三行 -->
                <div class="md:flex md:flex-1 justify-between items-center gap-10">
                    <div class="flex flex-1 justify-start items-center">
                        <p class="text-xl font-bold whitespace-nowrap">微信号码：</p>
                        <p class="text-xl font-bold whitespace-nowrap">{{ userDetail.wechatId }}</p>
                    </div>
                    <div class="flex flex-1 justify-start items-center">
                        <p class="text-xl font-bold whitespace-nowrap">抖音账号：</p>
                        <p class="text-xl font-bold whitespace-nowrap">{{ userDetail.douyinId }}</p>
                    </div>
                    <div class="flex flex-1 justify-start items-center">
                        <p class="text-xl font-bold whitespace-nowrap">是否特殊群体：</p>
                        <p class="text-xl font-bold whitespace-nowrap">{{ userDetail.isSpecialGroup }}</p>
                    </div>
                </div>



                <div class="h-full">
                    <p class="md:text-2xl font-extrabold text-xl text-center">家庭成员信息</p>
                </div>
                <!-- 第十四行 -->
                <div class="md:flex md:flex-1 justify-between items-center gap-10">
                    <div class="flex flex-1 justify-start items-center">
                        <p class="text-xl font-bold whitespace-nowrap">与本人关系</p>
                    </div>
                    <div class="flex flex-1 justify-start items-center">
                        <p class="text-xl font-bold whitespace-nowrap">成员姓名</p>
                    </div>
                    <div class="flex flex-1 justify-start items-center">
                        <p class="text-xl font-bold whitespace-nowrap">手机号</p>

                    </div>
                    <div class="flex flex-1 justify-start items-center">
                        <p class="text-xl font-bold whitespace-nowrap">工作单位</p>
                    </div>
                    <div class="flex flex-1 justify-start items-center">
                        <p class="text-xl font-bold whitespace-nowrap">职业</p>
                    </div>
                </div>

                <!-- 第十五行 -->
                <div class="md:flex md:flex-1 justify-between items-center gap-10">
                    <div class="flex flex-1 justify-start items-center">
                        <p class="text-xl font-bold whitespace-nowrap">父亲</p>
                    </div>
                    <div class="flex flex-1 justify-start items-center">
                        <p class="text-xl font-bold whitespace-nowrap">{{ userDetail.parent1Name }}</p>
                    </div>
                    <div class="flex flex-1 justify-start items-center">
                        <p class="text-xl font-bold whitespace-nowrap">{{ userDetail.parent1Phone }}</p>
                    </div>
                    <div class="flex flex-1 justify-start items-center">
                        <p class="text-xl font-bold whitespace-nowrap">{{ userDetail.parent1Company }}</p>
                    </div>
                    <div class="flex flex-1 justify-start items-center">
                        <p class="text-xl font-bold whitespace-nowrap">{{ userDetail.parent1Job }}</p>
                    </div>
                </div>

                <!-- 第十六行 -->
                <div class="md:flex md:flex-1 justify-between items-center gap-10">
                    <div class="flex flex-1 justify-start items-center">
                        <p class="text-xl font-bold whitespace-nowrap">母亲</p>
                    </div>
                    <div class="flex flex-1 justify-start items-center">
                        <p class="text-xl font-bold whitespace-nowrap">{{ userDetail.parent2Name }}</p>
                    </div>
                    <div class="flex flex-1 justify-start items-center">
                        <p class="text-xl font-bold whitespace-nowrap">{{ userDetail.parent2Phone }}</p>
                    </div>
                    <div class="flex flex-1 justify-start items-center">
                        <p class="text-xl font-bold whitespace-nowrap">{{ userDetail.parent2Company }}</p>
                    </div>
                    <div class="flex flex-1 justify-start items-center">
                        <p class="text-xl font-bold whitespace-nowrap">{{ userDetail.parent2Job }}</p>
                    </div>

                </div>

                <!-- 第十七行 -->
                <div class="md:flex md:flex-1 justify-between items-center gap-10">
                    <div class="flex flex-1 justify-start items-center">
                        <p class="text-xl font-bold whitespace-nowrap">紧急联系人</p>
                    </div>
                    <div class="flex flex-1 justify-start items-center">
                        <p class="text-xl font-bold whitespace-nowrap">{{ userDetail.emergencyContactName }}</p>
                    </div>
                    <div class="flex flex-1 justify-start items-center">
                        <p class="text-xl font-bold whitespace-nowrap">{{ userDetail.emergencyContactPhone }}</p>
                    </div>
                    <div class="flex flex-1 justify-start items-center">
                        <p class="text-xl font-bold whitespace-nowrap">/</p>
                    </div>
                    <div class="flex flex-1 justify-start items-center">
                        <p class="text-xl font-bold whitespace-nowrap">/</p>
                    </div>
                </div>

                <div class="h-full" v-if="userDetail.isSpecialGroup == '是'">
                    <p class="md:text-2xl font-extrabold text-xl text-center">
                        群体信息
                    </p>
                </div>
                <!-- 第十八行 -->
                <div class="md:flex md:flex-1 justify-between items-center gap-10"
                    v-if="userDetail.isSpecialGroup == '是'">
                    <div class="flex flex-1 justify-start items-center">
                        <p class="text-xl font-bold whitespace-nowrap">主要问题：</p>
                        <p class="text-xl font-bold whitespace-nowrap">{{ userDetail.mainProblem }}</p>
                    </div>
                </div>

                <!-- 第十九行 -->
                <div class="md:flex md:flex-1 justify-between items-center gap-10"
                    v-if="userDetail.isSpecialGroup == '是'">
                    <div class="flex flex-1 justify-start items-center">
                        <p class="text-xl font-bold whitespace-nowrap">并存问题：</p>
                        <p class="text-xl font-bold whitespace-nowrap">{{ userDetail.coexistingProblem }}</p>
                    </div>
                </div>

                <!-- 第二十行 -->
                <div class="md:flex md:flex-1 justify-between items-center gap-10"
                    v-if="userDetail.isSpecialGroup == '是'">
                    <div class="flex flex-1 justify-start items-center">
                        <p class="text-xl font-bold whitespace-nowrap">问题简述：</p>
                        <p class="text-xl font-bold whitespace-nowrap">{{ userDetail.problemDescription }}</p>
                    </div>
                </div>

                <!-- 第二十一行 -->
                <div class="md:flex md:flex-1 justify-between items-center gap-10"
                    v-if="userDetail.isSpecialGroup == '是'">
                    <div class="flex flex-1 justify-start items-center">
                        <p class="text-xl font-bold whitespace-nowrap">帮扶联系人：</p>
                        <p class="text-xl font-bold whitespace-nowrap">{{ userDetail.supportContact }}</p>
                    </div>
                    <div class="flex flex-1 justify-start items-center">
                        <p class="text-xl font-bold whitespace-nowrap">帮扶联系人电话：</p>
                        <p class="text-xl font-bold whitespace-nowrap">{{ userDetail.supportContactPhone }}</p>
                    </div>
                    <div class="flex flex-1 justify-start items-center">
                        <p class="text-xl font-bold whitespace-nowrap">备注：</p>
                        <p class="text-xl font-bold whitespace-nowrap">{{ userDetail.remarks }}</p>
                    </div>
                </div>
                <!-- 第二十三行 -->
                <div class="md:flex md:flex-1 justify-between items-center gap-10">

                </div>

                <div class="h-full">
                    <p class="md:text-2xl font-extrabold text-xl text-center">入党相关信息</p>
                </div>

                <!-- 第二十四行 -->
                <div class="md:flex md:flex-1 justify-between items-center gap-10">
                    <div class="flex flex-1 justify-start items-center">
                        <p class="text-xl font-bold whitespace-nowrap">政治面貌：</p>
                        <p class="text-xl font-bold whitespace-nowrap">{{ userDetail.politicalStatus }}</p>
                    </div>
                    <div class="flex flex-1 justify-start items-center">
                        <p class="text-xl font-bold whitespace-nowrap">入党进度：</p>
                        <p class="text-xl font-bold whitespace-nowrap">{{ userDetail.partyProgress }}</p>
                    </div>
                    <div class="flex flex-1 justify-start items-center">
                        <p class="text-xl font-bold whitespace-nowrap">入党培训进度：</p>
                        <p class="text-xl font-bold whitespace-nowrap">{{ userDetail.partyTrainingProgress }}</p>
                    </div>
                </div>

                <!-- 第二十五行 -->
                <div class="md:flex md:flex-1 justify-between items-center gap-10">
                    <div class="flex flex-1 justify-start items-center">
                        <p class="text-xl font-bold whitespace-nowrap">所在支部：</p>
                        <p class="text-xl font-bold whitespace-nowrap">{{ userDetail.branchName }}</p>
                    </div>
                    <div class="flex flex-1 justify-start items-center">
                        <p class="text-xl font-bold whitespace-nowrap">入党申请时间：</p>
                        <p class="text-xl font-bold whitespace-nowrap">{{ userDetail.applicationDate }}</p>
                    </div>
                    <div class="flex flex-1 justify-start items-center">
                        <p class="text-xl font-bold whitespace-nowrap">入党积极分子时间：</p>
                        <p class="text-xl font-bold whitespace-nowrap">{{ userDetail.activistDate }}</p>
                    </div>
                </div>

                <!-- 第二十六行 -->
                <div class="md:flex md:flex-1 justify-between items-center gap-10">
                    <div class="flex flex-1 justify-start items-center">
                        <p class="text-xl font-bold whitespace-nowrap">发展对象时间：</p>
                        <p class="text-xl font-bold whitespace-nowrap">{{ userDetail.developmentDate }}</p>
                    </div>
                    <div class="flex flex-1 justify-start items-center">
                        <p class="text-xl font-bold whitespace-nowrap">预备党员时间：</p>
                        <p class="text-xl font-bold whitespace-nowrap">{{ userDetail.probationaryDate }}</p>
                    </div>
                    <div class="flex flex-1 justify-start items-center">
                        <p class="text-xl font-bold whitespace-nowrap">发展转正时间：</p>
                        <p class="text-xl font-bold whitespace-nowrap">{{ userDetail.fullMemberDate }}</p>
                    </div>
                </div>

                <!-- 第二十七行 -->
                <div class="md:flex md:flex-1 justify-between items-center gap-10">
                    <div class="flex flex-1 justify-start items-center">
                        <p class="text-xl font-bold whitespace-nowrap">党建工时：</p>
                        <p class="text-xl font-bold whitespace-nowrap">{{ userDetail.partyHours }}</p>
                    </div>
                    <div class="flex flex-1 justify-start items-center">
                        <p class="text-xl font-bold whitespace-nowrap">党支部书记姓名：</p>
                        <p class="text-xl font-bold whitespace-nowrap">{{ userDetail.branchSecretary }}</p>
                    </div>
                    <div class="flex flex-1 justify-start items-center">
                        <p class="text-xl font-bold whitespace-nowrap">党支部副书记姓名：</p>
                        <p class="text-xl font-bold whitespace-nowrap">{{ userDetail.branchDeputySecretary }}</p>
                    </div>
                </div>

                <div class="h-full" v-if="userDetail.isSpecialGroup == '是'">
                    <p class="md:text-2xl font-extrabold text-xl text-center">谈话/跟踪记录</p>
                </div>

                <div v-for="(row, index) in tableData" :key="index">
                    <div class="md:flex md:flex-1 justify-between items-center gap-10">
                        <div class="flex w-28 justify-start items-center">
                            <p class="text-xl font-bold whitespace-nowrap">时间</p>
                        </div>
                        <div class="flex w-28 justify-start items-center">
                            <p class="text-xl font-bold whitespace-nowrap">谈话教师</p>
                        </div>
                        <div class="flex flex-1 justify-start items-center">
                            <p class="text-xl font-bold whitespace-nowrap">记录{{ index + 1 }}</p>
                        </div>
                    </div>

                    <div class="md:flex md:flex-1 justify-between items-start gap-10">
                        <div class="flex w-28 justify-start items-center">
                            <p class="text-xl font-bold whitespace-nowrap">{{ row.conversationTime }}</p>
                        </div>
                        <div class="flex w-28 justify-start items-center">
                            <p class="text-xl font-bold whitespace-nowrap">{{ row.conversationTeacher }}</p>
                        </div>
                        <div class="flex flex-1 justify-start items-center">
                            <p class="text-xl font-bold text-start">{{ row.conversationContent }}</p>
                        </div>
                    </div>
                </div>
            </div>
        </el-scrollbar>
    </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from "vue";
import { useRoute } from 'vue-router';
import printJS from 'print-js';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';

// 引入接口方法
import { getUserInfoById } from '../api/userInfo';
import { getConversationRecordById } from '../api/conversationRecords';
import type { UploadFile } from 'element-plus';
import { userInfoStore } from "../stores/UserInfoStore";
const userInfo = userInfoStore();

// 是否为修改模式
const route = useRoute();
const isEdit = ref(false);
const loading = ref(false);

const tableData = ref<any[]>([]);

// 定义表单字段
const id = ref('');
const name = ref('');
const gender = ref<'男' | '女'>('男');
const className = ref('');
const studentId = ref('');
const contactNumber = ref('');
const classTeacher = ref('');
const graduationTutor = ref('');
const futurePlan = ref('');
const salary = ref('');
const companyNature = ref('');
const workLocation = ref([]);
const employmentStatus = ref('实习');
const companyName = ref('');

const userDetail = ref<any>({
    imageUrl: '', // 头像
    id: '', // 用户ID
    name: '', // 姓名
    gender: '男', // 性别
    studentId: '', // 学号
    idCard: '', // 身份证号
    grade: '', // 年级
    major: '', // 专业
    className: '', // 班级
    classRole: '', // 班级职务
    specialization: '', // 专业方向
    birthDate: '', // 出生日期
    admissionDate: '', // 入学日期
    expectedGraduation: '', // 预计毕业时间
    nativePlace: '', // 籍贯
    sourcePlace: '', // 生源地
    ethnicity: '', // 民族
    residence: '', // 户口所在地
    homeAddress: '', // 家庭住址
    counselor: '', // 辅导员姓名
    counselorPhone: '', // 辅导员手机号
    classTeacher: '', // 班主任姓名
    classTeacherPhone: '', // 班主任手机号
    graduationTutor: '', // 毕设导师姓名
    graduationTutorPhone: '', // 毕设导师手机号
    dormitoryNumber: '', // 寝室号
    networkStatus: '', // 红旗网络
    dormitoryMembers: '', // 寝室成员名单
    politicalStatus: '', // 政治面貌
    partyProgress: '', // 入党进度
    partyTrainingProgress: '', // 入党培训进度
    branchName: '', // 所在支部
    applicationDate: '', // 入党申请时间
    activistDate: '', // 入党积极分子时间
    developmentDate: '', // 发展对象时间
    probationaryDate: '', // 预备党员时间
    fullMemberDate: '', // 发展转正时间
    partyHours: '', // 党建工时
    branchSecretary: '', // 党支部书记姓名
    branchDeputySecretary: '', // 党支部副书记姓名
    email: '',
    qqNumber: '',
    wechatId: '',
    douyinId: '',
    parent1Name: '',
    parent1Phone: '',
    parent1Company: '',
    parent1Job: '',
    parent2Name: '',
    parent2Phone: '',
    parent2Company: '',
    parent2Job: '',
    emergencyContactName: '',
    emergencyContactPhone: '',
    isSpecialGroup: '', // 是否属于特殊群体
    mainProblem: '', // 主要问题
    coexistingProblem: '', // 共存问题
    problemDescription: '', // 问题描述
    supportContact: '', // 支持联系人
    supportContactPhone: '', // 支持联系人电话
    trackingRecord: '', // 跟踪记录
    remarks: '', // 备注
});

// 定义上传文件列表
const fileList = ref<UploadFile[]>([]);

// 打印区域 DOM 的引用
const printArea = ref<HTMLDivElement | null>(null);

// 初始化
onMounted(async () => {
    await getUserInfoById(route.params.id as string).then((res) => {
        const data = res.data;
        console.log("userDetail.value", userDetail.value);
        // 如果不为空则填充表单字段,如果为空则重置表单字段
        if (data) {
            populateFormFields(data);
            isEdit.value = true;
            loading.value = true;
        } else {
            isEdit.value = false;
            resetFormFields();
        }

        loading.value = false;
    }).catch((err) => {
        console.log(err);
    });
    await fetchTableData();
});

// 导出为 PDF 并打印
const handleExportToPDF = async () => {
    const element = document.getElementById('printArea');
    if (!element) {
        console.error('打印区域未找到');
        return;
    }

    try {
        // 将 DOM 转为图片
        const canvas = await html2canvas(element, {
            scale: 2,
            useCORS: true, // 启用跨域支持
        });
        const imgData = canvas.toDataURL('image/jpeg', 1.0);

        // 创建 PDF
        const pdf = new jsPDF('p', 'mm', 'a4');
        const pdfWidth = pdf.internal.pageSize.getWidth();
        const pdfHeight = (canvas.height * pdfWidth) / canvas.width;
        pdf.addImage(imgData, 'JPEG', 0, 0, pdfWidth, pdfHeight);

        // 导出 PDF 文件 Blob URL
        const pdfBlob = pdf.output('blob');
        const pdfUrl = URL.createObjectURL(pdfBlob);

        // 使用 print-js 打印 PDF
        printJS({ printable: pdfUrl, type: 'pdf', showModal: true });
    } catch (error) {
        console.error('生成 PDF 失败:', error);
    }
};
const fetchTableData = async () => {
    loading.value = true;
    const data = {
        page: 1,
        size: 1000,
    };
    try {
        const res = await getConversationRecordById(data, route.params.id as string);
        loading.value = false;
        tableData.value = res.data.records;
    } catch (error) {
        loading.value = false;
        console.error('获取数据失败:', error);
    }
};

// 重置表单字段
const resetFormFields = () => {
    name.value = '';
    gender.value = '男';
    className.value = '';
    studentId.value = '';
    contactNumber.value = '';
    classTeacher.value = '';
    graduationTutor.value = '';
    futurePlan.value = '';
    salary.value = '';
    companyNature.value = '';
    workLocation.value = [];
    employmentStatus.value = '实习';
    companyName.value = '';
    fileList.value = [];
};

const populateFormFields = (data: any) => {
    Object.assign(userDetail.value, data);
    // 修改userDetail的imageUrl字段
    userDetail.value.imageUrl = 'http://10.248.6.72:8181/avatar/' + userDetail.value.studentId + '.jpg';
};
</script>

<style lang="scss" scoped>
.fade-enter-active,
.fade-leave-active {
    transition: opacity 0.3s ease;
}

.fade-enter-from,
.fade-leave-to {
    opacity: 0;
}

// 下面为el-select部分
@mixin select_radius {
    border-radius: 12px;
}


// 控制el-select的长度以及圆角
:deep(.el-select__wrapper) {
    height: 50px;
    @include select_radius;
}

// 控制el-select中文字的样式
:deep(.el-select__placeholder) {

    font-size: 16px;
    font-weight: bold;
}

// 控制点击后的边框颜色
:deep(.el-select__wrapper.is-focused) {
    box-shadow: 0 0 0 1px var(--accent-100);
}

// 下面为下拉框部分
// 下面用于控制整体的下拉框圆角
:deep(.el-select__popper.el-popper) {
    @include select_radius;
}


//下拉框的文本未选中的样式
// .el-select-dropdown__item {

// }
//下拉框的文本颜色选中之后的样式
.el-select-dropdown__item.is-selected {
    color: var(--accent-200);
}

.el-input {
    height: 50px;

    border-radius: 12px;
    border: 0.5px solid var(--text-200);
    border: 0;
    background-color: var(--bg-200);

    font-size: 16px;
    font-weight: bold;


    :deep(.el-input__wrapper) {
        border-radius: 12px;
    }

    :deep(.is-focus) {
        box-shadow: 0 0 0 1px var(--accent-100)
    }
}

// 下面是日期选择组件的自定义样式
:deep(.el-date-editor.el-input, .el-date-editor.el-input__wrapper) {
    width: 100%;
    height: 50px;
    border-radius: 12px;
}

.el-date-editor-style {
    --el-input-border-radius: 12px;
}



// 下面是数字选择组件的自定义样式
.el-input-number {
    width: 100%;
    height: 50px;
}

:deep(.el-input) {
    box-shadow: 0 0 0 1px var(--accent-200, var(--accent-100)) inset;
    border-radius: 12px;
}

:deep(.el-input-number__increase:hover~.el-input:not(.is-disabled) .el-input__wrapper) {
    box-shadow: 0 0 0 1px var(--accent-200, var(--accent-100)) inset;
}

:deep(.el-input-number__decrease:hover~.el-input:not(.is-disabled) .el-input__wrapper) {
    box-shadow: 0 0 0 1px var(--accent-200, var(--accent-100)) inset;
}

:deep(.el-input-number__increase:hover) {
    color: var(--accent-200);
}

:deep(.el-input-number__decrease:hover) {
    color: var(--accent-200);
}

:deep(.el-input__wrapper.is-focus) {
    box-shadow: 0 0 0 1px var(--accent-200, var(--accent-100)) inset !important;
}

// 下面是textarea组件的自定义样式
.el-textarea {
    font-size: 16px;
    font-weight: bold;

    --el-input-focus-border-color: var(--accent-200);
}


// 下面是地区选择组件的自定义样式
:deep(.el-cascader--large) {
    width: 100%;
    height: 50px;
}

:deep(.el-cascader .el-input) {
    height: 50px;
}

:deep(.el-input--large .el-input__wrapper) {
    border-radius: 12px;
}

:deep(.el-cascader .el-input .el-input__inner) {
    font-size: 16px;
    font-weight: bold;
}

.avatar-uploader .avatar {
    width: 80px;
    height: 112px;
    /* 80px * (35/25) */
    display: block;
}
</style>

<style>
.avatar-uploader .el-upload {
    border: 1px dashed var(--el-border-color);
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
    transition: var(--el-transition-duration-fast);
}

.avatar-uploader .el-upload:hover {
    border-color: var(--el-color-primary);
}

.el-icon.avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 80px;
    height: 112px;
    /* 80px * (35/25) */
    text-align: center;
}
</style>
