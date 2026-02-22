"use client";
import * as Yup from "yup";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createNote } from "@/lib/api"; 
import toast from "react-hot-toast";
import css from "./NoteForm.module.css";
import { NoteTag } from "@/types/note";
const NoteSchema = Yup.object().shape({
  title: Yup.string()
    .min(3, "Too Short!")
    .max(50, "Too Long!")
    .required("Title is required"),
  content: Yup.string()
    .max(500, "Content is too long"),
  tag: Yup.string()
    .oneOf(['Todo', 'Work', 'Personal', 'Meeting', 'Shopping'] as const)
    .required("Tag is required"),
});

interface NoteFormProps {
  onClose: () => void;
}

export default function NoteForm({ onClose }: NoteFormProps) {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: ({ title, content, tag }: { title: string; content: string; tag: NoteTag }) =>
      createNote(title, content, tag),
    onSuccess: () => {
        toast.success('Note created successfully');

      queryClient.invalidateQueries({ queryKey: ['notes'] });
      onClose(); 
    },
    onError: () => {
      toast.error('Failed to create note');
    }
  });

  return (
    <Formik
    initialValues={{ title: '', content: '', tag: 'Todo' as NoteTag }}
      validationSchema={NoteSchema}
      onSubmit={(values) => mutation.mutate(values)}
    >
      {() => (
        <Form className={css.form}>
          <div className={css.formGroup}>
            <label htmlFor="title">Title</label>
            <Field id="title" name="title" className={css.input} />
            <ErrorMessage name="title" component="span" className={css.error} />
          </div>

          <div className={css.formGroup}>
            <label htmlFor="content">Content</label>
            <Field as="textarea" id="content" name="content" rows={8} className={css.textarea} />
            <ErrorMessage name="content" component="span" className={css.error} />
          </div>

          <div className={css.formGroup}>
            <label htmlFor="tag">Tag</label>
            <Field as="select" id="tag" name="tag" className={css.select}>
              <option value="Todo">Todo</option>
              <option value="Work">Work</option>
              <option value="Personal">Personal</option>
              <option value="Meeting">Meeting</option>
              <option value="Shopping">Shopping</option>
            </Field>
            <ErrorMessage name="tag" component="span" className={css.error} />
          </div>

          <div className={css.actions}>
            <button type="button" className={css.cancelButton} onClick={onClose}>
              Cancel
            </button>
            <button type="submit" className={css.submitButton} disabled={mutation.isPending}>
              {mutation.isPending ? "Creating..." : "Create note"}
            </button>
          </div>
        </Form>
      )}
    </Formik>
  );
}