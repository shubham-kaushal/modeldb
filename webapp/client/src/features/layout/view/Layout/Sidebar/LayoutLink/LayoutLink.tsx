import cn from 'classnames';
import * as React from 'react';
import { NavLink } from 'react-router-dom';

import { IconType, Icon } from 'shared/view/elements/Icon/Icon';

import styles from './LayoutLink.module.css';

interface ILocalProps {
  to?: string;
  iconType: IconType;
  children: string;
  isCollapsed: boolean;
  isExternal?: boolean;
  onClick?(): void;
}

const Wrapper = ({
  children,
  to,
  isExternal,
  isCollapsed,
  title,
}: {
  to: string;
  children: React.ReactNode;
  isExternal: boolean;
  isCollapsed: boolean;
  title: string;
}) => {
  return isExternal ? (
    <a
      className={styles.root}
      target="_blank"
      rel="noopener noreferrer"
      href={to}
      title={title}
    >
      {children}
      {!isCollapsed && (
        <div className={cn(styles.icon, { [styles.externalLinkIcon]: true })}>
          <Icon type="external-link" />
        </div>
      )}
    </a>
  ) : (
    <NavLink
      title={title}
      to={to}
      className={styles.root}
      activeClassName={styles.active}
    >
      {children}
    </NavLink>
  );
};

class LayoutLink extends React.PureComponent<ILocalProps> {
  public render() {
    const {
      to,
      iconType,
      children,
      isExternal,
      isCollapsed,
      onClick,
    } = this.props;

    if (!to) {
      return (
        <div className={styles.root} onClick={onClick}>
          <div
            className={styles.icon}
            style={{ fontSize: '20px', marginRight: '15px', marginLeft: '3px' }}
          >
            <Icon type={iconType} />
          </div>
          {!isCollapsed && <div className={styles.text}>{children}</div>}
        </div>
      );
    }

    return (
      <Wrapper
        to={to}
        isExternal={Boolean(isExternal)}
        isCollapsed={isCollapsed}
        title={children}
      >
        <div className={styles.icon}>
          <Icon type={iconType} />
        </div>
        {!isCollapsed && <div className={styles.text}>{children}</div>}
      </Wrapper>
    );
  }
}

export default LayoutLink;
