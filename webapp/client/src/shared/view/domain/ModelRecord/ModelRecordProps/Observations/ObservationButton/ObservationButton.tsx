import cn from 'classnames';
import { bind } from 'decko';
import * as React from 'react';

import { getFormattedDateTime } from 'shared/utils/formatters/dateTime';
import { Icon } from 'shared/view/elements/Icon/Icon';
import Popup from 'shared/view/elements/Popup/Popup';

import styles from './ObservationButton.module.css';
import Table from 'shared/view/elements/Table/Table';

interface IAttributeVal {
  timeStamp: Date;
  value: string;
  epochNumber?: number;
}

interface ILocalProps {
  // IAttributeVal here do not let me iterate over the map
  groupedObs: Map<string, any>;
  attributeKey: string;
  additionalClassname?: string;
}

interface ILocalState {
  isModalOpen: boolean;
}

class AttributeButton extends React.PureComponent<ILocalProps, ILocalState> {
  public state: ILocalState = {
    isModalOpen: false,
  };
  public render() {
    const { groupedObs, attributeKey, additionalClassname } = this.props;
    const iconType = 'binoculars-tilted';
    const epochColumn = {
      type: 'epochNumber',
      title: 'Epoch number',
      width: '33%',
      render: ({ epochNumber }: { epochNumber: string | number }) => (
        <span>{epochNumber}</span>
      ),
    };
    return (
      <div>
        <Popup
          title={`Observations - ${attributeKey}`}
          titleIcon={iconType}
          contentLabel="observations-action"
          isOpen={this.state.isModalOpen}
          onRequestClose={this.handleCloseModal}
        >
          <div className={styles.popupContent}>
            {groupedObs &&
              groupedObs !== undefined &&
              attributeKey &&
              attributeKey !== undefined && (
                <Table
                  dataRows={groupedObs
                    .get(attributeKey)
                    .map((obs: IAttributeVal) => {
                      return {
                        ...obs,
                        epochNumber:
                          obs.epochNumber === undefined ? '-' : obs.epochNumber,
                        timeStamp: getFormattedDateTime(obs.timeStamp),
                      };
                    })}
                  getRowKey={this.getRowKey}
                  columnDefinitions={(this.isWithEpoch(groupedObs)
                    ? [epochColumn]
                    : []
                  ).concat([
                    {
                      type: 'timeStamp',
                      title: 'TimeStamp',
                      width: '33%',
                      render: ({ timeStamp }: any) => <span>{timeStamp}</span>,
                    },
                    {
                      type: 'value',
                      title: 'Value',
                      width: '34%',
                      render: ({ value }: any) => <span>{value}</span>,
                    },
                  ])}
                />
              )}
          </div>
        </Popup>

        <div
          className={cn(styles.attribute_link, styles.attribute_item)}
          onClick={this.showModal}
        >
          <div
            className={cn(styles.attribute_wrapper, additionalClassname)}
            title="view observations"
          >
            <div className={styles.notif}>
              <Icon className={styles.notif_icon} type={iconType} />
            </div>
            <div className={styles.attributeKey}>{attributeKey}</div>
          </div>
        </div>
      </div>
    );
  }

  @bind
  private isWithEpoch(groupedObs: Map<string, any>) {
    return groupedObs
      .get(this.props.attributeKey)
      .some((d: any) => d.epochNumber !== undefined);
  }

  @bind
  private getRowKey(row: { timeStamp: string; epochNumber: string | number }) {
    return row.timeStamp;
  }

  @bind
  private handleCloseModal() {
    this.setState({ isModalOpen: false });
  }

  @bind
  private showModal() {
    this.setState({ isModalOpen: true });
  }
}

export default AttributeButton;
