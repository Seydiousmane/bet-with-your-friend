import axios from "axios"
export function getGroup(id) {
    try{
        const response = await axios(`http://127.0.0.1:8000/api/groups/${id}`)
        console.log(response.data)
        setDataGroup(response.data)
        setLoading(false)
      } catch (e){
        console.log(e)
        setError(true)
        setLoading(false)
      }
}