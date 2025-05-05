
const Input = ({ label, id, ...props }) => {
    return (
        <div className="flex flex-col w-full">
            <label className="text-2xl" htmlFor={id}>{label}</label>
            <input className="bg-indigo-500 rounded-md p-2 text-xl" id={id} name={id} {...props} />
        </div>
    )
}

export default Input;