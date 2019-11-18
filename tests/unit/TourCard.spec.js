import { expect } from 'chai'
import { mount } from '@vue/test-utils'
import TourCard from '@/components/TourCard.vue'

describe('TourCard.vue', () => {
  it('renders props.tour', () => {
    const wrapper = mount(TourCard, {
      propsData: { tour: {
        title: 'German Tour: Parliament Quarter &amp; Reichstag glass dome',
        price: 14,
        currency: '$',
        rating: 4.8,
        isSpecialOffer: false,
        id: '3f31d29c-8dcb-4dd1-b506-9d702346ca88',
        image: 'https://images.unsplash.com/photo-1551736829-3072bc95de04?crop=entropy&cs=tinysrgb&fit=crop&fm=jpg&h=900&ixid=eyJhcHBfaWQiOjF9&ixlib=rb-1.2.1&q=80&w=1600'
      } }
    })

    const image = wrapper.find('.card-image-picture')
    expect(image.attributes().src).to.eql('https://images.unsplash.com/photo-1551736829-3072bc95de04?crop=entropy&cs=tinysrgb&fit=crop&fm=jpg&h=900&ixid=eyJhcHBfaWQiOjF9&ixlib=rb-1.2.1&q=80&w=1600')
    expect(image.attributes().alt).to.eql('German Tour: Parliament Quarter &amp; Reichstag glass dome')

    const title = wrapper.find('.title')
    expect(title.text()).to.eql('German Tour: Parliament Quarter & Reichstag glass dome')

    const price = wrapper.find('.price')
    expect(price.text()).to.eql('$ 14')

    expect(wrapper.contains('.rating.rating-50'))
  })

  it('renders special offer badge', () => {
    const wrapper = mount(TourCard, {
      propsData: { tour: {
        title: 'German Tour: Parliament Quarter &amp; Reichstag glass dome',
        price: 14,
        currency: '$',
        rating: 4.8,
        isSpecialOffer: true,
        id: '3f31d29c-8dcb-4dd1-b506-9d702346ca88',
        image: 'https://images.unsplash.com/photo-1551736829-3072bc95de04?crop=entropy&cs=tinysrgb&fit=crop&fm=jpg&h=900&ixid=eyJhcHBfaWQiOjF9&ixlib=rb-1.2.1&q=80&w=1600'
      } }
    })

    expect(wrapper.contains('.card-image-badge'))
  })

  it('slice very long title', () => {
    const wrapper = mount(TourCard, {
      propsData: { tour: {
        title: 'German Tour: Parliament Quarter &amp; Reichstag glass dome'.repeat(10),
        price: 14,
        currency: '$',
        rating: 4.8,
        isSpecialOffer: true,
        id: '3f31d29c-8dcb-4dd1-b506-9d702346ca88',
        image: 'https://images.unsplash.com/photo-1551736829-3072bc95de04?crop=entropy&cs=tinysrgb&fit=crop&fm=jpg&h=900&ixid=eyJhcHBfaWQiOjF9&ixlib=rb-1.2.1&q=80&w=1600'
      } }
    })

    const title = wrapper.find('.title')
    expect(title.text()).to.eql('German Tour: Parliament Quarter & Reichstag glass domeGerman Tour: Parliame…')
  })

  it('maps rating to className', () => {
    const wrapper = mount(TourCard, {
      propsData: { tour: {
        title: 'German Tour: Parliament Quarter &amp; Reichstag glass dome',
        price: 14,
        currency: '$',
        rating: 2.6,
        isSpecialOffer: true,
        id: '3f31d29c-8dcb-4dd1-b506-9d702346ca88',
        image: 'https://images.unsplash.com/photo-1551736829-3072bc95de04?crop=entropy&cs=tinysrgb&fit=crop&fm=jpg&h=900&ixid=eyJhcHBfaWQiOjF9&ixlib=rb-1.2.1&q=80&w=1600'
      } }
    })

    expect(wrapper.vm.$data.ratingClassName).to.eql('rating-25')
  })
})
