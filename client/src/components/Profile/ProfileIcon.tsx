import { IProfileIconProps } from '../../interface/interface';
import { useState } from 'react';
import {
  Dropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
} from 'reactstrap';
import Alien from './alien.png';

const ProfileIcon = ({ toggleModel, signOut }: IProfileIconProps) => {
  const [dropdownOpen, setDropdownOpen] = useState(false);

  return (
    <div className="pa4 tc">
      <Dropdown
        isOpen={dropdownOpen}
        toggle={() => setDropdownOpen(!dropdownOpen)}>
        <DropdownToggle
          tag="span"
          data-toggle="dropdown"
          aria-expanded={dropdownOpen}>
          <img src={Alien} className="br-100 ba h3 w3 dib" alt="avatar" />
        </DropdownToggle>
        <DropdownMenu
          end
          className="b--transparent shadow-5"
          style={{ backgroundColor: 'rgba(255,255,255,0.5)' }}>
          <DropdownItem onClick={toggleModel}>View Profile</DropdownItem>
          <DropdownItem onClick={signOut}>Sign Out</DropdownItem>
        </DropdownMenu>
      </Dropdown>
    </div>
  );
};

export default ProfileIcon;

