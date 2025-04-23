import axios from "axios"
import { BACKEND_URL } from "../../config";


async function getRoomId(slug:string){
   const response = await axios.get(`${BACKEND_URL}/room/${slug}`)
   return response.data.room.id
}



export default async function ChatRoomId({
  params,
}: {
  params: {
    slug: string;
  };
}) {
  const slug = params.slug;
  const roomId = await getRoomId(slug)
  return roomId
}
