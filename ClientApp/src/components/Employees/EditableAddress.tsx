import React from 'react'

import { requestJSONWithErrorHandler } from '../../helpers/requestHelpers'
import { AnyJson } from '../../types/JsonType'
import './EditableField.scss'
import { Employee } from '../../types/Employee'
import Address from '../DisplayHelpers/Address'
import { userNameFromState } from '../../helpers/userHelper'

interface IProps {
  employee: Employee
  refreshDataCallback: () => void
}

const EditableStringField = (props: IProps): JSX.Element => {
  const { employee } = props

  const line1Ref = React.useRef<HTMLInputElement>(null)

  const [line1, setLine1] = React.useState(employee.address1 || '')
  const [line2, setLine2] = React.useState(employee.address2 || '')
  const [city, setCity] = React.useState(employee.addressCity || '')
  const [province, setProvince] = React.useState(employee.addressProvince || '')
  const [postCode, setPostCode] = React.useState(employee.addressPostCode || '')
  const [isEditable, setIsEditable] = React.useState(false)

  const toggleEditable = (): void => {
    setIsEditable(!isEditable)
  }

  React.useEffect(() => {
    if (isEditable) {
      line1Ref.current?.select()
    }
  }, [isEditable])

  const submitEdit = (event: React.FormEvent<HTMLFormElement>): void => {
    event.preventDefault()
    requestJSONWithErrorHandler(
      `api/employees/${employee.id}`,
      'patch',
      {
        Address1: line1,
        Address2: line2,
        AddressCity: city,
        AddressProvince: province,
        AddressPostCode: postCode,
        AdminUserName: userNameFromState()
      },
      'CANNOT_EDIT_EMPLOYEE',
      (responseJSON: AnyJson): void => {
        toggleEditable()
        console.log(responseJSON)
        props.refreshDataCallback()
      }
    )
  }

  return (
    <div className="EditableField">
      {isEditable ? (
        <form onSubmit={submitEdit}>
          <input
            type="text"
            className="form-control form-control-sm"
            value={line1}
            onChange={(e): void => setLine1(e.target.value)}
            placeholder="Address line 1"
            ref={line1Ref}
          />
          <input
            type="text"
            className="form-control form-control-sm"
            value={line2}
            onChange={(e): void => setLine2(e.target.value)}
            placeholder="Address line 2"
          />
          <input
            type="text"
            className="form-control form-control-sm"
            value={city}
            onChange={(e): void => setCity(e.target.value)}
            placeholder="City"
          />
          <input
            type="text"
            className="form-control form-control-sm"
            value={province}
            onChange={(e): void => setProvince(e.target.value)}
            placeholder="Province"
          />
          <input
            type="text"
            className="form-control form-control-sm"
            value={postCode}
            onChange={(e): void => setPostCode(e.target.value)}
            placeholder="Post code"
          />
          <input
            type="button"
            value="Cancel"
            className="btn btn-sm btn-outline-danger mt-2 mr-2"
            onClick={toggleEditable}
          />
          <input
            type="submit"
            value="Save"
            className="btn btn-sm btn-primary mt-2"
          />
        </form>
      ) : (
        <span onClick={toggleEditable}>
          <div className="Editable">
            <Address employee={employee} />
          </div>
        </span>
      )}
    </div>
  )
}

export default EditableStringField
