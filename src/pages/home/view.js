import { Form, Input, Table } from "antd";
import React, { useContext, useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchUserApps } from "./services/actions";
import * as Status from "./services/status.js";
import * as actions from "./services/actions";

export const EditableContext = React.createContext();

export const EditableRow = ({ index, ...props }) => {
  const [form] = Form.useForm();
  return (
    <Form form={form} component={false}>
      <EditableContext.Provider value={form}>
        <tr {...props} />
      </EditableContext.Provider>
    </Form>
  );
};

export const EditableCell = ({
  title,
  editable,
  children,
  dataIndex,
  record,
  handleSave,
  ...restProps
}) => {
  const [editing, setEditing] = useState(false);
  const inputRef = useRef();
  const form = useContext(EditableContext);
  useEffect(() => {
    if (editing) {
      inputRef.current.focus();
    }
  }, [editing]);

  const toggleEdit = () => {
    setEditing(!editing);
    form.setFieldsValue({
      [dataIndex]: record[dataIndex],
    });
  };

  const save = async (e) => {
    try {
      const values = await form.validateFields();
      toggleEdit();
      handleSave({ ...record, ...values });
    } catch (errInfo) {
      console.log("Save failed:", errInfo);
    }
  };

  let childNode = children;

  if (editable) {
    childNode = editing ? (
      <Form.Item
        style={{
          margin: 0,
        }}
        name={dataIndex}
        rules={[
          {
            required: true,
            message: `${title} is required.`,
          },
        ]}
      >
        <Input ref={inputRef} onPressEnter={save} onBlur={save} />
      </Form.Item>
    ) : (
      <div
        className="editable-cell-value-wrap"
        style={{
          paddingRight: 24,
        }}
        onClick={toggleEdit}
      >
        {children}
      </div>
    );
  }

  return <td {...restProps}>{childNode}</td>;
};

const rcolumns = [
  {
    title: "Name",
    dataIndex: "name",
    key: "name",
    editable: true,
  },
  {
    title: "KeyCode",
    dataIndex: "keycode",
    key: "keycode",
  },
];

const UserApps = () => {
  const { status, data } = useSelector((state) => state.userApps);
  const dispatch = useDispatch();
  const handleSave = (row) => {
    const newData = [...data];
    const index = newData.findIndex((item) => row.key === item.key);
    const item = newData[index];
    newData.splice(index, 1, { ...item, ...row });
    console.log(newData);
    // fetchUserApps(newData);
    dispatch(actions.fetchUserApps(newData));
  };
  const components = {
    body: {
      row: EditableRow,
      cell: EditableCell,
    },
  };
  const columns = rcolumns.map((col) => {
    if (!col.editable) {
      return col;
    }
    return {
      ...col,
      onCell: (record) => ({
        record,
        editable: col.editable,
        dataIndex: col.dataIndex,
        title: col.title,
        handleSave: handleSave,
      }),
    };
  });

  switch (status) {
    case Status.LOADING: {
      return (
        <div>
          {dispatch(fetchUserApps())}
          App 信息请求中...
        </div>
      );
    }
    case Status.SUCCESS: {
      return (
        <div>
          {data.map((app) => (
            <div key={app.id}>{app.name}</div>
          ))}
          <Table
            columns={columns}
            dataSource={data}
            components={components}
            rowClassName={() => "editable-row"}
            bordered
          />
        </div>
      );
    }
    case Status.FAILURE: {
      return <div>App 信息装载失败</div>;
    }
    default: {
      throw new Error("unexpected status " + status);
    }
  }
};

export default UserApps;
