import VueTestUtils from '@vue/test-utils'
import messages from '@/assets/messages.json'

const locale = 'en'

VueTestUtils.config.mocks['$t'] = (msg) => messages[locale][msg]

export const mount = VueTestUtils.mount
export const shallowMount = VueTestUtils.shallowMount
