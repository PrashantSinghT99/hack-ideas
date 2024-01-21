import {URL} from './constant';
import apiHelper from './apiHelper';

export const loginApi=async(empId)=>
{
    return await apiHelper('post',`${URL}/user/login`,{empId:empId},"")
}