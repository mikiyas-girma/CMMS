import SidebarWithHeader from "../components/sidebar/SidebarWithHeader";

const Notification = () => {
  const notifications = [
    {
      user: { name: "John" },
      materialName: "Dangote Cement 50kg",
      quantity: 3,
      time: "10:30 AM",
    },
    {
      user: { name: "mikiyas" },
      materialName: "Steel Rods",
      quantity: 2,
      time: "11:15 AM",
    },
    {
      user: { name: "Nanati" },
      materialName: "Paint Buckets",
      quantity: 4,
      time: "12:00 PM",
    },
    {
      user: { name: "Biniam" },
      materialName: "Bricks",
      quantity: 6,
      time: "1:30 PM",
    },
    {
      user: { name: "Nanati" },
      materialName: "Plumbing Fixtures",
      quantity: 1,
      time: "2:45 PM",
    },
    {
      user: { name: "Bini" },
      materialName: "Wood Boards",
      quantity: 8,
      time: "3:20 PM",
    },
    {
      user: { name: "Jibril" },
      materialName: "Nails",
      quantity: 5,
      time: "4:00 PM",
    },
    {
      user: { name: "Nanati" },
      materialName: "Insulation",
      quantity: 3,
      time: "4:45 PM",
    },
    {
      user: { name: "Mikiyas" },
      materialName: "Tiles",
      quantity: 7,
      time: "5:15 PM",
    },
    {
      user: { name: "Jibril" },
      materialName: "Paint Cans",
      quantity: 2,
      time: "6:00 PM",
    },
  ];

  return (
    <SidebarWithHeader>
      <div className="relative divide-y divide-gray-200 max-w-[900px] m-auto mt-12">
        {notifications.map((notification, index) => (
          <div key={index} className="p-4 cursor-pointer hover:bg-gray-100">
            <div className="flex items-start">
              <div className="ml-3 w-0 flex-1 pt-0.5">
                <p className="text-sm leading-5 font-medium text-gray-900">
                  {notification.user.name}, Material {notification.materialName}{" "}
                  quantity is {notification.quantity}. Please reorder.
                </p>
              </div>
            </div>
            <div className="flex justify-end">
              <span className="text-sm text-gray-500">{notification.time}</span>
            </div>
          </div>
        ))}
      </div>
    </SidebarWithHeader>
  );
};

export default Notification;
