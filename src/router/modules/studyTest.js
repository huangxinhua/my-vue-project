const studyTestRouter = {
  path: '/study',
  component: () => import('@/components/study/mixins/minxinsTest.vue'),
  name: 'study',
  meta: {},
  path: '/draggable',
  component: () => import('@/components/study/draggable/banner.vue'),
  name: 'draggable',
  meta: {},
  children: []
}
export default studyTestRouter
