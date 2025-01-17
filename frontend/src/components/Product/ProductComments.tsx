import { ProductWithFlags } from "@pcc/shared";

interface ProductCommentsProps {
  productWithFlags: ProductWithFlags;
}

export const ProductComments: React.FC<ProductCommentsProps> = ({
  productWithFlags,
}) => {
  // const [comments, setComments] = useState<Comment[]>([]);
  // const [comment, setComment] = useState("");
  // const { auth } = useAuth();
  // const { data: product } = useQuery<Product>(["product", productId], () =>
  //   getProduct(productId),
  // );
  // const { data: commentsData, refetch } = useQuery<Comment[]>(
  //   ["comments", productId],
  //   () => getComments(productId),
  // );

  // useEffect(() => {
  //   if (commentsData) {
  //     setComments(commentsData);
  //   }
  // }, [commentsData]);

  // const handleSubmit = async (e: React.FormEvent) => {
  //   e.preventDefault();
  //   if (!comment) return;

  //   const newComment = {
  //     productId,
  //     comment,
  //     client: auth.client!,
  //   };

  //   await createComment(newComment);
  //   setComment("");
  //   refetch();
  // };

  // return (
  //   <div className="mt-8">
  //     <h2 className="text-2xl font-semibold">Comments</h2>
  //     <div className="mt-4">
  //       {comments.map((comment) => (
  //         <div key={comment.id} className="mt-4">
  //           <p className="text-gray-600">
  //             <span className="font-semibold">{comment.client.username}</span>{" "}
  //             {comment.comment}
  //           </p>
  //         </div>
  //       ))}
  //     </div>
  //     {auth.client && (
  //       <form onSubmit={handleSubmit} className="mt-4">
  //         <textarea
  //           value={comment}
  //           onChange={(e) => setComment(e.target.value)}
  //           placeholder="Write a comment..."
  //           className="w-full p-2 border border-gray-300 rounded"
  //         ></textarea>
  //         <button
  //           type="submit"
  //           className="w-full mt-2 bg-gray-800 text-white p-2 rounded"
  //         >
  //           Comment
  //         </button>
  //       </form>
  //     )}
  //   </div>
  // );

  return (
    <div className="mt-8">
      <h2 className="text-2xl font-semibold">
        Comentarios de {productWithFlags.name}
      </h2>
      <div className="mt-4">
        <div key="1" className="mt-4">
          <p className="text-gray-600">
            <span className="font-semibold">Pepito</span> Un producto excelente!
          </p>
        </div>
        <div key="2" className="mt-4">
          <p className="text-gray-600">
            <span className="font-semibold">Manolo</span> No me ha gustado nada.
          </p>
        </div>
      </div>
      <form className="mt-4">
        <textarea
          value=""
          onChange={() => {}}
          placeholder="Dinos qué piensas... (Not implemented)"
          className="w-full p-2 border border-gray-300 rounded"
        ></textarea>
        <button
          // type="submit"
          className="w-full mt-2 bg-gray-800 text-white p-2 rounded"
        >
          Comentar
        </button>
      </form>
    </div>
  );
};
