import React from 'react';
import { useCart } from '../context/CartContext';
import Swal from 'sweetalert2';
import { Link } from 'react-router-dom';

function Cart() {
  const { cart, dispatch } = useCart();

  const handleRemove = (index) => {
    dispatch({ type: 'REMOVE_FROM_CART', payload: index });
  };

  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  const confirmDelete = (onConfirm) => {
    Swal.fire({
      title: 'Bạn có chắc chắn muốn xoá?',
      text: 'Sản phẩm sẽ bị xoá khỏi giỏ hàng!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#dc2626', // đỏ
      cancelButtonColor: '#6b7280',  // xám
      confirmButtonText: 'Xoá',
      cancelButtonText: 'Huỷ'
    }).then((result) => {
      if (result.isConfirmed) {
        onConfirm();
        Swal.fire({
          title: 'Đã xoá!',
          icon: 'success',
          timer: 1500,
          showConfirmButton: false
        });
      }
    });
  };  

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <h1 className="text-3xl font-bold mb-6">Giỏ hàng</h1>
      {cart.length === 0 ? (
        <p className="text-gray-600">Giỏ hàng của bạn đang trống.</p>
      ) : (
        <div className="space-y-6">
          {cart.map((item, index) => (
              <div key={item.productId} className="flex items-center justify-between bg-white p-4 rounded shadow">
                <div className="flex items-center gap-4">
                  <img src={item.image} alt={item.name} className="w-24 h-24 object-cover rounded" />
                  <div>
                    <h2 className="text-lg font-semibold">{item.name}</h2>
                    <p>Size: {item.selectedSize} | Màu: {item.selectedColor}</p>
                    <div className="flex items-center gap-3 mt-2">
                      <button
                        onClick={() => {
                          if (item.quantity > 1) {
                            dispatch({
                              type: 'UPDATE_QUANTITY',
                              payload: { index, quantity: item.quantity - 1 }
                            });
                          } else {
                            // Xác nhận xóa sản phẩm khi số lượng = 0
                            Swal.fire({
                              title: 'Bạn có chắc chắn muốn xoá?',
                              text: 'Sản phẩm sẽ bị xoá khỏi giỏ hàng!',
                              icon: 'warning',
                              showCancelButton: true,
                              confirmButtonColor: '#dc2626', // đỏ
                              cancelButtonColor: '#6b7280',  // xám
                              confirmButtonText: 'Xoá',
                              cancelButtonText: 'Huỷ'
                            }).then((result) => {
                              if (result.isConfirmed) {
                                dispatch({ type: 'REMOVE_FROM_CART', payload: index });
                                Swal.fire({
                                  title: 'Đã xoá!',
                                  icon: 'success',
                                  timer: 1500,
                                  showConfirmButton: false
                                });
                              }
                            });
                          }
                        }}
                        className="px-3 py-1 border rounded-full text-xl font-semibold"
                      >
                        -
                      </button>
                      <span className="min-w-[24px] text-center">{item.quantity}</span>
                      <button
                        onClick={() =>
                          dispatch({
                            type: 'UPDATE_QUANTITY',
                            payload: { index, quantity: item.quantity + 1 }
                          })
                        }
                        className="px-3 py-1 border rounded-full text-xl font-semibold"
                      >
                        +
                      </button>
                    </div>
                    <p className="text-orange-600 font-bold mt-2">${(item.price * item.quantity).toFixed(2)}</p>
                  </div>
                </div>
                <button
                  onClick={() => confirmDelete(() => dispatch({ type: 'REMOVE_FROM_CART', payload: index }))}
                  className="text-red-600 hover:text-red-800 font-medium"
                >
                  Xoá
                </button>
              </div>
          ))}
          <div className="text-right text-xl font-bold text-gray-800">
            Tổng cộng: ${total.toFixed(2)}
          </div>
            <div className="flex justify-center">
                <Link
                to="/checkout"
                className="bg-orange-600 text-white px-4 py-2 rounded hover:bg-orange-700 transition duration-200"
                >
                Thanh toán
                </Link>
            </div>
        </div>
      )}
    </div>
  );
}

export default Cart;
