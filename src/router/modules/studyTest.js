const studyTestRouter = {
  path: '/study',
  component: () => import('@/components/study/mixins/minxinsTest.vue'),
  name: 'study',
  meta: {},

  children: []
}
export default studyTestRouter
