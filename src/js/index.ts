import axios, {
    AxiosResponse,
    AxiosError
} from "../../node_modules/axios/index";

interface IBook {
    id: number;
    Title: string;
    Author: string;
    price: number;
}
let baseUri: string = "http://anbo-bookstorerest.azurewebsites.net/api/Books"
new Vue({
    el: "#app",
    data:{
        books: [],
        bookForm: {id: 0, Title: "", Author: "", price: 0},
        deleteId: 0,
        deleteMessage: "",
        addMessage: ""

    },
    methods: {
        showBooks(){
            console.log("show books")
            axios.get<IBook[]>(baseUri)
                .then((response: AxiosResponse<IBook[]>)=>{
                    console.log(response.data)
                    this.books = response.data
                })
                .catch((error: AxiosError) =>{
                    alert(error.message)
                })
            
        },

        addBook(){
            axios.post<IBook>(baseUri, this.bookForm)
                .then((response: AxiosResponse) =>{
                    let message: string = "response " + response.status + " " + response.statusText
                    this.addMessage = message
                    this.getBooks()
                })
                .catch((error: AxiosError) =>{
                    alert(error.message)
                })
        },

        deleteBook(deleteId: number){
            let uri: string = baseUri + "/" + deleteId
            axios.delete<void>(uri)
                .then((response: AxiosResponse<void>) =>{
                    this.deleteMessage = response.status + " " + response.statusText
                })
                .catch((error: AxiosError) =>{
                    alert(error.message)
                })
        }
    }
})






