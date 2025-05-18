import { useEffect, useRef, useState } from "react";
import Input from "./UI/Input";
import { editUser, fetchUser, queryClient } from "../util/http";
import { useDispatch, useSelector } from "react-redux";
import { useMutation, useQuery } from "@tanstack/react-query";
import { formattedDate } from "../util/util";
import { authActions } from "../store/auth-slice";
import { getAuthUserId } from "../util/auth";
import { RootState } from "../store";

/**
 * This component renders a profile card with all user's details.
 */
const ProfileDetails: React.FC = () => {
    const [selectImage, setSelectImage] = useState(false);
    const pfpRef = useRef<HTMLInputElement>(null);
    const dispatch = useDispatch();

    const auth = useSelector((state: RootState) => state.auth);

    const { data: user, isPending, isError, error } = useQuery({
        queryKey: [{ userId: getAuthUserId() }],
        queryFn: ({ signal, queryKey }) => {
            const queryParams = queryKey[0] && typeof queryKey[0] === "object" ? { userId: Number(queryKey[0].userId) } : { userId: -1 };   
            return fetchUser({ signal, ...queryParams });
        },
        staleTime: 5 * 60 * 1000
    })

    useEffect(() => {
        if (user) {
            dispatch(authActions.login(user));
        }
    }, [user]);


    const { mutate: editUserMutate, isPending: editUserIsPending, isError: editUserIsError, error: editUserError } = useMutation({
        mutationFn: editUser,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: [{ userId: getAuthUserId() }] });
        }
    })

    const handlePFPSave = () => {

        if (!pfpRef?.current?.value.trim()) {
            alert("URL cannot be empty");
            return;
        }

        editUserMutate({ userId: auth?.user?.id ?? -1, userData: { profileImage: pfpRef?.current?.value } });
        setSelectImage((prev) => !prev);
    }

    if (isError) {
        return <p>{error.message ?? "An error occurred. Failed to load user."}</p>
    }

    if (isPending) {
        return <p>Loading...</p>
    }

    return (
        <div className="bg-white text-black rounded-lg shadow-lg p-5 mt-10 space-y-5">
            <h3 className="font-bold text-3xl mb-5">Profile Details</h3>

            <div className="flex max-lg:flex-col">
                <div className="mr-11">
                    {editUserIsPending && <p>Loading...</p>}
                    {editUserIsError && <p className="text-red-600">{editUserError.message ?? "An error occurred. Failed to update pfp."}</p>}
                    {selectImage &&
                        <div className="flex items-end gap-2 mb-2 max-lg:max-w-[calc(100vw-13rem)]">
                            <Input label="Profile Pic URL" id="profileImage" type="text" ref={pfpRef} />
                            <button type="button" className="bg-indigo-500 text-white px-5 py-2 rounded-md uppercase hover:cursor-pointer hover:bg-indigo-400" onClick={handlePFPSave}>Save</button>
                        </div>
                    }
                    <img src={user?.profileImage ?? null} alt="pfp" className="rounded-full object-cover w-24 h-24 border hover:cursor-pointer" onClick={() => setSelectImage((prev) => !prev)} />
                </div>
                <div>
                    <div className="flex items-center">
                        <h4 className="font-bold text-xl mr-3">E-Mail:</h4>
                        <p className="text-indigo-500 font-extrabold text-2xl">{auth?.user?.email}</p>
                    </div>

                    <div className="flex items-center">
                        <h4 className="font-bold text-xl mr-3">Name:</h4>
                        <p className="text-indigo-500 font-extrabold text-2xl">{auth?.user?.name}</p>
                    </div>

                    <div className="flex items-center">
                        <h4 className="font-bold text-xl mr-3">Username:</h4>
                        <p className="text-indigo-500 font-extrabold text-2xl">{auth?.user?.username}</p>
                    </div>

                    <div className="flex items-center">
                        <h4 className="font-bold text-xl mr-3">Joined:</h4>
                        <p className="text-indigo-500 font-extrabold text-lg">{formattedDate(auth?.user?.joinDate ?? "")}</p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ProfileDetails;