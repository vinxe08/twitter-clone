import { motion } from "framer-motion";
import { useRouter } from "next/router";
import { IPosts } from "../../interfaces/Posts";
import ModalPhoto from "./ModalPhoto";
import CommentCard from "../Thread/CommentCard";
import ModalField from "./ModalField";
import ModalPostCard from "./ModalPostCard";

const gifYouUp = {
  hidden: {
    opacity: 0,
    scale: 0,
  },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      duration: 0.2,
      ease: "easeIn",
    },
  },
  exit: {
    opacity: 0,
    scale: 0,
    transition: {
      duration: 0.15,
      ease: "easeOut",
    },
  },
};

interface IProps {
  post: IPosts | null
}

const ModalCard: React.FC<IProps> = ({post}) => {
  const { push } = useRouter()

  const closeModal = () => { push('/thread') }

  return (
      <motion.div className='fixed w-full h-full left-0 top-0 bg-[#030303cb] z-40 flex'
          variants={gifYouUp}
          initial="hidden"
          animate="visible"
          exit="exit" >
          <div
            onClick={closeModal}>
            <ModalPhoto post={post} />
          </div>
          <div className="hidden lg:block w-[29rem] bg-white dark:bg-[#1D2226] overflow-y-scroll relative">
            <ModalPostCard post={post}/>
            <ModalField post={post}/>
            { post?.comments?.map((comment, index) => (
                <CommentCard key={index} thread={comment} postOwner={post.name}/>
              ))
            }
        </div>
      </motion.div>
  )
}

export default ModalCard