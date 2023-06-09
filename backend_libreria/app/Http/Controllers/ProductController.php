<?php

namespace App\Http\Controllers;

use App\Models\Product;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Validator;

/**
 * @OA\Info(title="API de libreria", version="1.0")
 *
 */

class ProductController extends Controller
{

    //metodo __construct
    public function __construct(){
        $this->middleware('auth:api', ['except' => ['index', 'show', 'list']]);
    }


    /**
     * @OA\Post(
     *     path="/api/product",
     *     summary="Guardar una Producto por el admin",
     *     @OA\Response(
     *         response=200,
     *         description="Guardar una Producto"
     *     ),
     *     @OA\Response(
     *         response="default",
     *         description="Ha ocurrido un error."
     *     )
     * )
     */

    //Guardar un producto ADMIN
    public function store(Request $request){

        $usertype=Auth::user()->usertype;


            $validator = Validator::make($request->all(),
                [
                    'title' => 'required|max:255',
                    'price' => 'required',
                    'description' => 'required',
                    'quantity' => 'required',
                ]
            );

            if($validator->fails()) {
                return response()->json(['error' => $validator->errors()], 401);
            }

            $input = $request->all();
            if ($file = $request->file('file')) {
                $name = $file->getClientOriginalName();
                $file->move('productssimgs/', $name);
                $input['file'] = $name;
            }


            $user = Auth::user();
            $product = new Product($input);
            $product->image = 'productssimgs/' . $input['file'];
            $product->save();

            return $product;

    }


    /**
     * @OA\Get(
     *     path="/api/products",
     *     summary="Mostrar todos los productos",
     *     @OA\Response(
     *         response=200,
     *         description="Mostrar todos los productos sin haber iniciado sesion"
     *     ),
     *     @OA\Response(
     *         response="default",
     *         description="Ha ocurrido un error."
     *     )
     * )
     */
    //todas las productos
    public function index(Request $request){
        $products = Product::all();
        return $products;
    }

    /**
     * @OA\Get(
     *     path="/api/products/{id}",
     *     summary="Mostrar un producto por id",
     *     @OA\Response(
     *         response=200,
     *         description="Mostrar un productopor id sin haber iniciado sesion"
     *     ),
     *     @OA\Response(
     *         response="default",
     *         description="Ha ocurrido un error."
     *     )
     * )
     */
    //mostrar por id
    public function show(Request $request, $id){
        $product = Product::findOrFail($id);
        return $product;
    }


    /**
     * @OA\Delete(
     *     path="/api/products/{id}/delete",
     *     summary="Eliminar un producto por id",
     *     @OA\Response(
     *         response=200,
     *         description="Eliminar un producto por el admin"
     *     ),
     *     @OA\Response(
     *         response="default",
     *         description="Ha ocurrido un error."
     *     )
     * )
     */
    //Eliminar peticion admin
    public function destroy(Request $request, $id){
            $product = Product::findOrFail($id);
            $product->delete();
            return $product;
    }

    /**
     * @OA\Put(
     *     path="/api/product/{id}/update",
     *     summary="Actualizar un producto por admin",
     *     @OA\Response(
     *         response=200,
     *         description="Actualizar un producto por el admin"
     *     ),
     *     @OA\Response(
     *         response="default",
     *         description="Ha ocurrido un error."
     *     )
     * )
     */
    //actualizar producto ==admin
    public function update(Request $request,  $id){
        $usertype = Auth::user()->usertype;
        //si el usuario esta iniciado sesion como admin, PUEDE ACTUALIZAR UN PRODUCTO

            $product = Product::findOrFail($id);
            $product->update($request->all());
            //return $product;
            return response()->json(['message' => 'Esta es la peticion modificada', 'data' => $product], 200);
    }




    /**
     * @OA\Get(
     *     path="/api/productos",
     *     summary="Mostrar los producto paginados",
     *     @OA\Response(
     *         response=200,
     *         description="Mostrar los producto paginados"
     *     ),
     *     @OA\Response(
     *         response="default",
     *         description="Ha ocurrido un error."
     *     )
     * )
     */
    function list(Request $request) {
      $products = Product::jsonPaginate();
        return $products;
    }






}
