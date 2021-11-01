import React from 'react'
import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { UserNavbar } from '../ui/UserNavbar'
import { getUsers } from '../../actions/users'
import './userUsersScreen.css'

import TabsContainer from '../ui/TabsContainer'
import { emptyUser, userRoles, usersFormTabsInfo } from '../../utils/constants'
import Roles from './UserForm/Roles'
import UploadImageButton from '../ui/UploadImageButton'
import ImagePreview from '../ui/ImagePreview'
import PersonalInfo from './UserForm/PersonalInfo'
import Services from './UserForm/Services'
import SubmitButton from './UserForm/SubmitButton'
import UsersList from './UsersList'
import Swal from 'sweetalert2'
import AttentionHoursAndDays from './UserForm/AttentionHoursAndDays'
import { toPropperCaseAndTrim } from '../../helpers/toPropperCase'
import { uiLoading, uiRefreshImage } from '../../actions/ui'
import { set } from 'date-fns'

const baseUrl = process.env.REACT_APP_API_URL

const UserUsersScreen = () => {
  const dispatch = useDispatch()
  const { loading } = useSelector((state) => state.ui)
  const [addingUser, setAddingUser] = useState(true)
  const [selectedTab, setSelectedTab] = useState(0)
  const [avatarFiles, setAvatarFiles] = useState([])
  const [previewImageUrls, setPreviewImageUrls] = useState([])
  const [user, setUser] = useState(emptyUser)

  const { roles, services, workWeek } = user

  const handleInputChange = ({ target }) => {
    const value =
      target.type === 'number' ? parseInt(target.value) : target.value

    setUser({
      ...user,
      [target.name]: value,
    })
  }

  const handleServiceClick = ({ target }) => {
    const selectedServiceId = target.getAttribute('id')

    if (user.services.some((s) => s.service === selectedServiceId)) {
      setUser({
        ...user,
        services: user.services.filter(
          (service) => selectedServiceId !== service.service
        ),
      })
    } else {
      setUser({
        ...user,
        services: [...user.services, { service: selectedServiceId, price: 0 }],
      })
    }
  }

  const handleRolesChange = ({ target }) => {
    if (user.roles.includes(target.value)) {
      setUser({
        ...user,
        services: target.value === 'USER' ? [] : user.services,
        workWeek: target.value === 'USER' ? emptyUser.workWeek : user.workWeek,
        roles: user.roles.filter((r) => r !== target.value),
      })
    } else {
      setUser({
        ...user,
        roles: [...user.roles, target.value],
      })
    }
  }

  const handlePriceChange = ({ target }, serviceId) => {
    setUser({
      ...user,
      services: [
        ...services.map((s) => ({
          service: s.service,
          price: s.service === serviceId ? target.value : s.price,
        })),
      ],
    })
  }

  const handleSubmit = (e) => {
    e.preventDefault()

    const formData = new FormData()
    if (avatarFiles[0]) {
      formData.append('user-image', avatarFiles[0].file, avatarFiles[0].name)
    }

    user.name = toPropperCaseAndTrim(user.name)
    user.lastname = toPropperCaseAndTrim(user.lastname)

    formData.append('user', JSON.stringify(user))
    const url = `${baseUrl}/user${!addingUser ? '/' + user._id : ''}`
    dispatch(uiLoading(true))
    fetch(url, {
      method: addingUser ? 'POST' : 'PUT',
      body: formData,
    })
      .then(async (res) => {
        const response = await res.json()
        if (response.ok) {
          dispatch(getUsers())
          Swal.fire('Listo!', response.message, 'success')
        } else {
          Swal.fire('Datos incorrectos', response.message, 'warning')
        }
        dispatch(uiRefreshImage())
        dispatch(uiLoading(false))
      })
      .catch((e) => {
        Swal.fire(
          'Error del servidor',
          'Contacte al administrador de la aplicación',
          'error'
        )
      })
  }

  const handleImageChange = ({ target }) => {
    const file = target.files[0]
    const reader = new FileReader()

    reader.onload = () => {
      if (reader.readyState === 2) {
        setPreviewImageUrls([reader.result])
        setAvatarFiles([{ file, name: file.name }])
      }
    }

    file && reader.readAsDataURL(file)
  }

  const handleWorkWeekChange = (hour, dayIndex) => {
    const newWorkHours = workWeek[dayIndex]?.hours.includes(hour)
      ? workWeek[dayIndex]?.hours.filter((h) => h !== hour)
      : [...workWeek[dayIndex]?.hours, hour]

    const newWorkWeek = workWeek.map((day, index) => {
      if (index === dayIndex) {
        let updatedDay = { ...day, hours: [...newWorkHours] }
        return updatedDay
      } else {
        return day
      }
    })

    setUser({
      ...user,
      workWeek: [...newWorkWeek],
    })
  }

  return (
    <div>
      <UserNavbar />

      <div className='view-container'>
        <div className='form-and-tabs-container'>
          <TabsContainer
            selectedTab={selectedTab}
            roles={roles}
            setSelectedTab={setSelectedTab}
            tabsInfo={usersFormTabsInfo}
          />
          <form onSubmit={handleSubmit} className='form-container'>
            {selectedTab === 0 && (
              <div className='user-form-fields'>
                <PersonalInfo
                  userInfo={user}
                  handleChange={handleInputChange}
                  addingUser={addingUser}
                />
                <div className='user-form-right-side d-flex flex-column align-items-center'>
                  <Roles
                    acceptedRoles={userRoles}
                    selectedRoles={roles}
                    handleChange={handleRolesChange}
                  />

                  <UploadImageButton
                    inputId='user-image'
                    icon='fas fa-camera-retro'
                    handleChange={handleImageChange}
                  />
                  <ImagePreview
                    previewImageUrls={previewImageUrls}
                    avatarFiles={avatarFiles}
                    setAvatarFiles={setAvatarFiles}
                    setPreviewImageUrls={setPreviewImageUrls}
                    imageIndex={0}
                    relatedButtonId='user-image'
                  />
                </div>
              </div>
            )}
            {selectedTab === 1 && (
              <div>
                <Services
                  services={services}
                  handleServiceChange={handleServiceClick}
                  handlePriceChange={handlePriceChange}
                />

                <AttentionHoursAndDays
                  workWeek={workWeek}
                  handleChange={handleWorkWeekChange}
                />
              </div>
            )}

            <SubmitButton addingUser={addingUser} loading={loading} />
          </form>
        </div>
        <UsersList
          setAddingUser={setAddingUser}
          setAvatarFiles={setAvatarFiles}
          setPreviewImageUrls={setPreviewImageUrls}
          setUser={setUser}
        />
      </div>
    </div>
  )
}

export default UserUsersScreen
