import { expect } from 'chai'
import Vue from 'vue'
import { shallowMount } from './test-utils'
import Main from '@/components/Main.vue'
import TourCard from '@/components/TourCard'

describe('Main.vue', () => {
  it('renders special offers by default', async () => {
    const wrapper = shallowMount(Main, {})
    const tour = {
      title: 'Berlin: 2.5-Hour Boat Tour Along the River Spree',
      price: 41,
      currency: '$',
      rating: 4.5,
      isSpecialOffer: true,
      id: '6f08e18f-4be9-4edc-9fd1-1269befcb50a',
      image: 'https://images.unsplash.com/photo-1565967932272-366833db2aab?crop=entropy&cs=tinysrgb&fit=crop&fm=jpg&h=900&ixid=eyJhcHBfaWQiOjF9&ixlib=rb-1.2.1&q=80&w=1600'
    }

    wrapper.setData({
      input: '',
      state: {
        query: '',
        loading: false,
        isSearchFailed: false,
        results: []
      },
      data: {
        fuse: null,
        tours: {
          '6f08e18f-4be9-4edc-9fd1-1269befcb50a': tour
        },
        offers: ['6f08e18f-4be9-4edc-9fd1-1269befcb50a']
      }
    })

    await Vue.nextTick()

    const sectionTitle = wrapper.find('.section-title')
    expect(sectionTitle.text()).to.eql('section-special-offers-header')

    expect(wrapper.find(TourCard).exists()).to.be.true // eslint-disable-line no-unused-expressions
    expect(wrapper.find(TourCard).props('tour')).to.eql(tour)
  })

  it('renders search results and pass them as props', async () => {
    const wrapper = shallowMount(Main)
    const tour = {
      title: 'German Tour: Parliament Quarter &amp; Reichstag glass dome',
      price: 14,
      currency: '$',
      rating: 4.8,
      isSpecialOffer: false,
      id: '3f31d29c-8dcb-4dd1-b506-9d702346ca88',
      image: 'https://images.unsplash.com/photo-1551736829-3072bc95de04?crop=entropy&cs=tinysrgb&fit=crop&fm=jpg&h=900&ixid=eyJhcHBfaWQiOjF9&ixlib=rb-1.2.1&q=80&w=1600'
    }

    wrapper.setData({
      input: 'input',
      state: {
        query: 'input',
        loading: false,
        isSearchFailed: false,
        results: ['3f31d29c-8dcb-4dd1-b506-9d702346ca88']
      },
      data: {
        fuse: null,
        tours: {
          '3f31d29c-8dcb-4dd1-b506-9d702346ca88': tour
        },
        offers: []
      }
    })

    await Vue.nextTick()

    const sectionTitle = wrapper.find('.section-title')
    expect(sectionTitle.text()).to.eql('section-results-header')

    expect(wrapper.find(TourCard).exists()).to.be.true // eslint-disable-line no-unused-expressions
    expect(wrapper.find(TourCard).props('tour')).to.eql(tour)
  })

  it('renders no results notification and special offers', async () => {
    const wrapper = shallowMount(Main)
    const tour = {
      title: 'Berlin: 2.5-Hour Boat Tour Along the River Spree',
      price: 41,
      currency: '$',
      rating: 4.5,
      isSpecialOffer: true,
      id: '6f08e18f-4be9-4edc-9fd1-1269befcb50a',
      image: 'https://images.unsplash.com/photo-1565967932272-366833db2aab?crop=entropy&cs=tinysrgb&fit=crop&fm=jpg&h=900&ixid=eyJhcHBfaWQiOjF9&ixlib=rb-1.2.1&q=80&w=1600'
    }

    wrapper.setData({
      input: 'input',
      state: {
        query: 'input',
        loading: false,
        isSearchFailed: true,
        results: []
      },
      data: {
        fuse: null,
        tours: {
          '6f08e18f-4be9-4edc-9fd1-1269befcb50a': tour
        },
        offers: ['6f08e18f-4be9-4edc-9fd1-1269befcb50a']
      }
    })

    await Vue.nextTick()

    const noResults = wrapper.find('.no-results')
    expect(noResults.exists()).to.be.true // eslint-disable-line no-unused-expressions
    expect(noResults.text()).to.eql('no-results')

    const sectionTitle = wrapper.find('.section-title')
    expect(sectionTitle.text()).to.eql('section-special-offers-header')

    expect(wrapper.find(TourCard).exists()).to.be.true // eslint-disable-line no-unused-expressions
    expect(wrapper.find(TourCard).props('tour')).to.eql(tour)
  })
})
