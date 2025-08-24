import { React, useRef, useState, useEffect } from 'react'
import Copy from "../../public/icons/copy.svg"
import { ToastContainer, toast, Bounce } from 'react-toastify';
import { v4 as uuidv4 } from 'uuid';

const Manager = () => {
    const notify = () => toast('Wow so easy !');
    const showBtnRef = useRef()
    const passwordRef = useRef()
    const [form, setForm] = useState({ site: '', username: '', password: '' })
    const [PasswordsArray, setPasswordsArray] = useState([])

    const getPasswords = async () => {
        let req = await fetch("http://localhost:3000/")
        let passwords = await req.json();
        console.log(passwords)
        setPasswordsArray(passwords)
    }



    useEffect(() => {
        getPasswords();
    }, [])
    const copyToClipboard = (text) => {
        toast('Text Copied to Clipboard!', {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: false,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
            transition: Bounce
        });
        navigator.clipboard.writeText(text)
    }


    const showPassword = () => {
        if (showBtnRef.current.src.includes("/icons/show.svg")) {
            passwordRef.current.type = "text";
            showBtnRef.current.src = "../../public/icons/showcross.svg"
        } else {
            showBtnRef.current.src = "../../public/icons/show.svg"
            passwordRef.current.type = "password";

        }
    }
    const handleInput = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value })
    }

    const savePassword = async () => {
        if (form.username.length > 3 && form.site.length > 3 && form.password.length > 3) {

            toast('Password added', {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: false,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "dark",
                transition: Bounce
            });
             await fetch("http://localhost:3000/", { method: "DELETE", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ id:form.id }) })

            setPasswordsArray([...PasswordsArray, { ...form, id: uuidv4() }]);
            let res = await fetch("http://localhost:3000/", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ ...form, id: uuidv4() }) })

            // localStorage.setItem("passwords", JSON.stringify([...PasswordsArray, {...form,id:uuidv4()}  ]));
            // console.log([...PasswordsArray, form]);
            setForm({ site: '', username: '', password: '' });
        } else {
            toast('Invalid Password! ', {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: false,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "dark",
                transition: Bounce
            });
            setForm({ site: '', username: '', password: '' });

        }
    }
    const deletePassword = async (id) => {

        console.log("deleting", id)
        let c = confirm("Do you really want to delete?");
        if (c) {
            setPasswordsArray(PasswordsArray.filter((item) => item.id !== id));
            // localStorage.setItem("passwords", JSON.stringify(PasswordsArray.filter((item)=>item.id!==id)));
            let res = await fetch("http://localhost:3000/", { method: "DELETE", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ id }) })
            toast('Deleted Successfully!', {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: false,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "dark",
                transition: Bounce
            });
        }
    }
    const editPassword = (id) => {
        console.log("editing", id)
        setForm({...PasswordsArray.filter((item) => item.id === id)[0],id:id})
        setPasswordsArray(PasswordsArray.filter((item) => item.id !== id));

    }

    return (
        <>
            <ToastContainer
                position="top-right"
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick={false}
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="light"
                transition={Bounce}
            />
            <div className="absolute inset-0 -z-10 h-full w-full bg-green-50 bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:14px_24px]"><div className="absolute left-0 right-0 top-0 -z-10 m-auto h-[310px] w-[310px] rounded-full bg-green-400 opacity-20 blur-[100px]"></div></div>
            <div className='myContainer '>
                <h1 className='font-bold text-center text-2xl mt-3 '>
                    <span className='text-green-700'> &lt;</span>
                    <span >Pass</span>
                    <span className='text-green-700' >OP</span>
                    <span className='text-green-700'>/&gt;</span>
                </h1>
                <p className='text-green-900 text-center text-lg'>Your own password manager</p>
                <div className='flex flex-col p-4 gap-8 text-black w-full '>
                    <input value={form.site} onChange={handleInput} type="text" placeholder='Enter website name' name="site" id="site" className='rounded-full border border-green-800 p-4 py-1 ' />
                    <div className='flex flex-col md:flex-row justify-between gap-4 '>
                        <input value={form.username} onChange={handleInput} type="text" placeholder='Enter username' name="username" id="username" className='w-full rounded-full border border-green-800 p-4 py-1 ' />
                        <div className="relative">

                            <input ref={passwordRef} value={form.password} onChange={handleInput} type="password" placeholder='Enter password' name="password" id="password" className='w-full rounded-full border border-green-800 p-4 py-1 ' />
                            <span className='absolute top-[8px] right-1 w-fit cursor-pointer'>
                                <img src="../../public/icons/show.svg" ref={showBtnRef} alt="show" srcset="" onClick={showPassword} className='w-[17px]' />
                            </span>
                        </div>
                    </div>
                    <button onClick={savePassword} className='w-fit mx-auto flex justify-center  gap-2  border-black border-2 bg-green-400 hover:bg-green-300 rounded-full px-5 py-1'>
                        <lord-icon
                            src="https://cdn.lordicon.com/fqbvgezn.json"
                            trigger="hover"
                            colors="primary:#121331,secondary:#000000">
                        </lord-icon>
                        <span className='my-2'>Save Password</span>
                    </button>
                </div>

                <div className="passwords">
                    <h2 className='text-2xl font-bold p-2'>Passwords</h2>
                    {PasswordsArray.length === 0 && <div>No Passwords to show</div>}
                    {PasswordsArray.length !== 0 && <table className="table-auto w-full rounded-md overflow-hidden  ">
                        <thead className='bg-green-800 text-white'>
                            <tr>
                                <th className='py-2'>Site Names</th>
                                <th className='py-2'>Usernames</th>
                                <th className='py-2'>Passwords</th>
                                <th className='py-2'>Actions</th>
                            </tr>
                        </thead>
                        <tbody className='bg-green-100'>
                            {PasswordsArray.map((item, index) => {
                                return <tr key={index}>
                                    <td className='p-2  border border-white '>
                                        <div className='flex gap-1'>
                                            <a href={item.site} target='_blank'>{item.site}</a>
                                            <img src={Copy} className='w-5 cursor-pointer' alt="" srcset="" onClick={() => { copyToClipboard(item.site) }} />
                                        </div>
                                    </td>
                                    <td className='p-2  border border-white  '>
                                        <div className='flex gap-1'>
                                            <span>{item.username}</span><img src={Copy} className='w-5 cursor-pointer' alt="" srcset="" onClick={() => { copyToClipboard(item.username) }} />
                                        </div>
                                    </td>
                                    <td className='p-2  border border-white '>
                                        <div className='flex gap-1'>
                                            <span>{"*".repeat(item.password.length)}</span><img src={Copy} className='w-5 cursor-pointer' alt="" srcset="" onClick={() => { copyToClipboard(item.password) }} />
                                        </div>
                                    </td>
                                    <td className='p-2  border border-white '>
                                        <div className='flex gap-2'>

                                            <span onClick={() => deletePassword(item.id)}>
                                                <lord-icon
                                                    src="https://cdn.lordicon.com/jzinekkv.json"
                                                    trigger="hover"
                                                    stroke="bold"
                                                    style={{ "width": "25px", "height": "25px" }}>
                                                </lord-icon>
                                            </span>
                                            <span onClick={() => editPassword(item.id)}><lord-icon
                                                src="https://cdn.lordicon.com/exymduqj.json"
                                                trigger="hover"
                                                stroke="bold"
                                                style={{ "width": "25px", "height": "25px" }}>
                                            </lord-icon></span>
                                        </div>
                                    </td>
                                </tr>
                            })}

                        </tbody>
                    </table>}
                </div>

            </div>
        </>
    )
}

export default Manager