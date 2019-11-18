import VueTestUtils from '@vue/test-utils'

VueTestUtils.config.mocks['$t'] = (msg) => msg

export const mount = VueTestUtils.mount
export const shallowMount = VueTestUtils.shallowMount
