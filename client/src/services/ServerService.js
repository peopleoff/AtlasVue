import Api from '@/services/Api'

export default {

  getAllServers (location_id) {
    return Api().get(`Servers/${location_id}`)
  },
  getAllServerTypes () {
    return Api().get('ServerTypes')
  },
  showServer (id) {
    return Api().get(`DisplayServer/${id}`)
  }
}