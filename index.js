let data = [];
axios.get('http://localhost:3002/dataContacts')
    .then((response) => {
        console.log(response)
        const listHTML = document.querySelector("#contacts>ul>ol")
        data = response.data;

        response.data.forEach(item => {
            const {
                id,
                name,
                address,
                email,
                noHandphone,
                company
            } = item;
            const isiHTML = `<li>
                <i class="fa fa-user" aria-hidden="true"></i>
                Nama : ${name}
                <br>
                <i class="fa fa-map-marker" aria-hidden="true"></i>
                Alamat : ${address}
                <br>
                <i class="fa fa-envelope" aria-hidden="true"></i>
                Email : ${email} 
                <br>
                <i class="fa fa-phone" aria-hidden="true"></i>
                No HP : ${noHandphone}
                <br>
                <i class="fa fa-building" aria-hidden="true"></i>
                Company : ${company}
                <br>
                <br>
                <button onclick="ubah(${id})"class="btn btn-dark"><i class="fa fa-pencil" aria-hidden="true"></i></button>
                <button onclick="Del(${id})"class="btn btn-dark"><i class="fa fa-trash" aria-hidden="true"></i></button>
                </li>`;
            listHTML.innerHTML += isiHTML;
        });
    })
    .catch((exceptionError) => {
        console.error(exceptionError);
    })

document.getElementById('simpanData').addEventListener('click',function(event){


    const name = document.getElementsByName('name')[0].value;
    const address = document.getElementsByName('address')[0].value;
    const email = document.getElementsByName('email')[0].value;
    const noHandphone = document.getElementsByName('noHandphone')[0].value;
    const company = document.getElementsByName('company')[0].value;
    axios.post('http://localhost:3002/dataContacts', {
        name,
        address,
        email,
        noHandphone,
        company
    })
})



const Del = id =>{
    axios.delete(`http://localhost:3002/dataContacts/${id}`)
}
const ubah = id =>{
    const contact = data.find(item =>{
        return item.id === id
    })

    if(contact){
        const name = window.prompt('Nama',contact.name);
        const address = window.prompt('Alamat',contact.address);
        const email = window.prompt ('Email',contact.email);
        const noHandphone = window.prompt('No HP',contact.noHandphone);
        const company = window.prompt('Company',contact.company);
        axios.put(`http://localhost:3002/dataContacts/${id}`,{
            name,
            address,
            email,
            noHandphone,
            company
        });
    }
}