import request from './request'

export const RegisterApi = (params) => request.post('/register',params)
export const LoginApi = (params) => request.post('/login',params)
export const ArticlesApi = (params) => request.get('/article',{params})
export const AddArticleApi = (params)=> request.post('/article/add',params)
export const getArticleByidApi = (params)=> request.get(`/article/${params.id}`)
export const updateArticleApi = (params)=> request.put('/article/update',params)
export const removeArticleApi = (params)=> request.post('/article/remove',params)
export const GetInfoApi = () => request.get('/info')
export const ChangeUserDataApi = (params)=> request.put('/info',params)


