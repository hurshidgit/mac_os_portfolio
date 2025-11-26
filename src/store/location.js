import { locations } from '@constants/index'
import { create } from 'zustand'
import { immer } from 'zustand/middleware/immer'

const DEFAULT_LOCATION = locations.work

const useLocationStore = create(
	immer(set => ({
		activeLocation: DEFAULT_LOCATION,

		setActiveLocation: (location = null) => {
			set(state => {
				state.activeLocation = location
			})
		},

		resetActiveLocation: () => {
			set(state => {
				state.activeLocation = DEFAULT_LOCATION
			})
		},
	}))
)

export default useLocationStore
