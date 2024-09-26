import request from '@/utils/request'

export function getTicketOpenCount(assign) {
  return request({
    url: `/api/v1/tickets/tickets/?applicant=${assign}&status=open`,
    method: 'get'
  })
}
